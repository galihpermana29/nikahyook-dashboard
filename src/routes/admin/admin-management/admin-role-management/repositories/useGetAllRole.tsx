import { TGeneralFilter } from '@/shared/models/generalInterfaces';
import { DashboardRoleAPI } from '@/shared/repositories/roleServies';
import useConvertQuery from '@/shared/usecase/useConvertQuery';
import useSuccessAxios from '@/shared/usecase/useSuccessAxios';
import { useDebounce } from '@uidotdev/usehooks';
import { FormInstance } from 'antd';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';

const useQueryAdminRoles = (form: FormInstance<any>) => {
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

  const [queryAdminRoles, setQueryAdminRoles] = useState<TGeneralFilter>({
    limit: limit ? parseInt(limit) : initialFilterState.limit,
    page: page ? parseInt(page) : initialFilterState.page,
    keyword: keyword ?? initialFilterState.keyword,
    status: status ?? initialFilterState.status,
  });

  const { objectToQueryParams } = useConvertQuery();
  const { addIndexToData } = useSuccessAxios();
  const queries = useDebounce(queryAdminRoles, 1000);

  const getAllRoles = async () => {
    const queryParams = objectToQueryParams(queryAdminRoles);
    setSearchParams(queryParams);
    const { data, meta_data } = await DashboardRoleAPI.getAllRoles(queryParams);

    return { data: addIndexToData(data), meta_data };
  };
  const {
    data: result,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['admins', { ...queries }],
    queryFn: getAllRoles,
  });

  const handleFilter = (value: any) => {
    for (const x in value) {
      if (value[x]) {
        setQueryAdminRoles((val) => ({ ...val, [x]: value[x], page: 1 }));
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

    setQueryAdminRoles(() => ({
      ...clearFilterQuery,
    }));
  };

  return {
    result,
    error,
    isLoading,
    refetch,
    setQueryAdminRoles,
    queryAdminRoles,
    handleFilter,
    clearFilter,
  };
};

export default useQueryAdminRoles;
