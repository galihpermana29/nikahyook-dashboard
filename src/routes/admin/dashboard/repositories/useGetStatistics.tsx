import { DashboardStatisticsAPI } from '@/shared/repositories/dashboardStatisticsService';
import { TGeneralFilter } from '@/shared/models/generalInterfaces';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import dayjs from 'dayjs';
import useConvertQuery from '@/shared/usecase/useConvertQuery';

const useQueryStatistics = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getInitialFilterState = (): TGeneralFilter => {
    const endDate = dayjs().endOf('day');
    const startDate = endDate.subtract(6, 'day').startOf('day');
    return {
      start_date_trx: startDate.format('DD-MM-YYYY'),
      end_date_trx: endDate.format('DD-MM-YYYY'),
    };
  };

  const initialFilterState = getInitialFilterState();

  const [queryStatistics, setQueryStatistics] = useState<TGeneralFilter>({
    start_date_trx:
      searchParams.get('start_date_trx') ?? initialFilterState.start_date_trx,
    end_date_trx:
      searchParams.get('end_date_trx') ?? initialFilterState.end_date_trx,
  });

  const { objectToQueryParams } = useConvertQuery();

  const getStatistics = async () => {
    const queryParams = objectToQueryParams(queryStatistics);
    setSearchParams(queryParams);
    const { data } =
      await DashboardStatisticsAPI.getAllDashboardStatistics(queryParams);
    return data;
  };

  const {
    data: result,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['dashboard-statistics', { ...queryStatistics }],
    queryFn: getStatistics,
  });

  return {
    result,
    error,
    isLoading,
    refetch,
    setQueryStatistics,
    queryStatistics,
  };
};

export default useQueryStatistics;
