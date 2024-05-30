import { TGeneralFilter } from '@/shared/models/generalInterfaces';
import { DashboardUserAPI } from '@/shared/repositories/userServices';
import useConvertQuery from '@/shared/usecase/useConvertQuery';
import useSuccessAxios from '@/shared/usecase/useSuccessAxios';
import { useDebounce } from '@uidotdev/usehooks';
import { FormInstance } from 'antd';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';

const useQueryClientUser = (form: FormInstance) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = searchParams.get('keyword');
  const status = searchParams.get('status');
  const limit = searchParams.get('limit');
  const page = searchParams.get('page');

  // Default filter state
  const initialFilterState: TGeneralFilter = {
    limit: 10,
    page: 1,
    keyword: '',
    status: 'default',
  };

  const [queryClientUser, setQueryClientUser] = useState<TGeneralFilter>({
    limit: limit ? parseInt(limit) : initialFilterState.limit,
    page: page ? parseInt(page) : initialFilterState.page,
    keyword: keyword ?? initialFilterState.keyword,
    status: status ?? initialFilterState.status,
  });

  const { objectToQueryParams } = useConvertQuery();
  const { addIndexToData } = useSuccessAxios();
  const queries = useDebounce(queryClientUser, 1000);

  const getUserClient = async () => {
    const queryParams = objectToQueryParams(queryClientUser);
    setSearchParams(queryParams);

    const { data, meta_data } = await DashboardUserAPI.getAllClientUser(
      queryParams
    );

    return { data: addIndexToData(data), meta_data };
  };

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['user-client', { ...queries }],
    queryFn: getUserClient,
  });

  const handleFilter = (value) => {
    for (const x in value) {
      if (value[x]) {
        setQueryClientUser((val) => ({ ...val, [x]: value[x] }));
      }
    }
  };

  const clearFilter = () => {
    const clearFilterQuery = {
      ...initialFilterState,
      limit: queries.limit,
      page: queries.page,
    };
    form.setFieldsValue(clearFilterQuery);

    setQueryClientUser(() => ({
      ...clearFilterQuery,
    }));
  };

  return {
    data,
    error,
    isLoading,
    refetch,
    setQueryClientUser,
    queryClientUser,
    handleFilter,
    clearFilter,
  };
};

export default useQueryClientUser;
