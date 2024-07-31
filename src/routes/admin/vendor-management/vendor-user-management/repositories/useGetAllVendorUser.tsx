import { TGeneralFilter } from '@/shared/models/generalInterfaces';
import { DashboardUserAPI } from '@/shared/repositories/userServices';
import useConvertQuery from '@/shared/usecase/useConvertQuery';
import useSuccessAxios from '@/shared/usecase/useSuccessAxios';
import { useDebounce } from '@uidotdev/usehooks';
import { FormInstance } from 'antd';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';

const useQueryVendorUser = (form: FormInstance<any>) => {
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

  const [queryVendorUser, setQueryVendorUser] = useState<TGeneralFilter>({
    limit: limit ? parseInt(limit) : initialFilterState.limit,
    page: page ? parseInt(page) : initialFilterState.page,
    keyword: keyword ?? initialFilterState.keyword,
    status: status ?? initialFilterState.status,
  });

  const { objectToQueryParams } = useConvertQuery();
  const { addIndexToData } = useSuccessAxios();
  const queries = useDebounce(queryVendorUser, 1000);

  const getVendorUser = async () => {
    const queryParams = objectToQueryParams(queryVendorUser);
    setSearchParams(queryParams);

    const { data, meta_data } = await DashboardUserAPI.getAllVendorUser(
      queryParams
    );
    return { data: addIndexToData(data), meta_data };
  };

  const {
    data: result,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['vendor', { ...queries }],
    queryFn: getVendorUser,
  });

  const handleFilter = (value: any) => {
    for (const x in value) {
      if (value[x]) {
        setQueryVendorUser((val) => ({ ...val, page: 1, [x]: value[x] }));
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

    setQueryVendorUser(() => ({
      ...clearFilterQuery,
    }));
  };

  return {
    result,
    error,
    isLoading,
    refetch,
    setQueryVendorUser,
    queryVendorUser,
    handleFilter,
    clearFilter,
  };
};

export default useQueryVendorUser;
