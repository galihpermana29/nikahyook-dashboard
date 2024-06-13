import { TGeneralFilter } from '@/shared/models/generalInterfaces';
import { DashboardRoleAPI } from '@/shared/repositories/roleServies';
import { DashboardUserAPI } from '@/shared/repositories/userServices';
import useConvertQuery from '@/shared/usecase/useConvertQuery';
import useSuccessAxios from '@/shared/usecase/useSuccessAxios';
import { useDebounce } from '@uidotdev/usehooks';
import { FormInstance } from 'antd';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';

const useQueryAdmins = (form: FormInstance<any>) => {
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

  // Change filter state based on searchParams
  // use default filter state if its searchParams' key doesn't exist
  const [queryAdmins, setQueryAdmins] = useState<TGeneralFilter>({
    limit: limit ? parseInt(limit) : initialFilterState.limit,
    page: page ? parseInt(page) : initialFilterState.page,
    keyword: keyword ?? initialFilterState.keyword,
    status: status ?? initialFilterState.status,
  });

  const { objectToQueryParams } = useConvertQuery();
  const { addIndexToData, dataToSelectOptions } = useSuccessAxios();
  const queries = useDebounce(queryAdmins, 1000);

  const getAdmins = async () => {
    const queryParams = objectToQueryParams(queryAdmins);
    setSearchParams(queryParams);
    const { data, meta_data } = await DashboardUserAPI.getAllAdminUser(
      queryParams
    );

    return { data: addIndexToData(data), meta_data };
  };

  const getRoles = async () => {
    const { data } = await DashboardRoleAPI.getAllRoles('status=active');
    return dataToSelectOptions(data, 'id', 'name');
  };

  const { data: roles } = useQuery({
    queryKey: ['roles'],
    queryFn: getRoles,
  });

  const {
    data: result,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['admins', { ...queries }],
    queryFn: getAdmins,
  });

  const handleFilter = (value: any) => {
    for (const x in value) {
      if (value[x]) {
        setQueryAdmins((val) => ({ ...val, [x]: value[x] }));
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

    setQueryAdmins(() => ({
      ...clearFilterQuery,
    }));
  };

  return {
    result,
    roles,
    error,
    isLoading,
    refetch,
    setQueryAdmins,
    queryAdmins,
    handleFilter,
    clearFilter,
  };
};

export default useQueryAdmins;
