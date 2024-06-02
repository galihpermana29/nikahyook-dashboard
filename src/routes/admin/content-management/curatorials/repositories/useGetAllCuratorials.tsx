import { TGeneralFilter } from '@/shared/models/generalInterfaces';
import { CuratorialsAPI } from '@/shared/repositories/curatorialServices';
import { DashboardRoleAPI } from '@/shared/repositories/roleServies';
import useConvertQuery from '@/shared/usecase/useConvertQuery';
import useSuccessAxios from '@/shared/usecase/useSuccessAxios';
import { useDebounce } from '@uidotdev/usehooks';
import { FormInstance } from 'antd';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';

const useQueryCuratorials = (form: FormInstance<any>) => {
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
  const [queryOptions, setQueryOptions] = useState<TGeneralFilter>({
    limit: limit ? parseInt(limit) : initialFilterState.limit,
    page: page ? parseInt(page) : initialFilterState.page,
    keyword: keyword ?? initialFilterState.keyword,
    status: status ?? initialFilterState.status,
  });

  const { objectToQueryParams } = useConvertQuery();
  const { addIndexToData, dataToSelectOptions } = useSuccessAxios();
  const queries = useDebounce(queryOptions, 1000);

  const getCuratorials = async () => {
    const queryParams = objectToQueryParams(queryOptions);
    setSearchParams(queryParams);
    const { data, meta_data } = await CuratorialsAPI.getAllCuratorials(
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
    queryKey: ['curatorials', { ...queries }],
    queryFn: getCuratorials,
  });

  const handleFilter = (value: any) => {
    for (const x in value) {
      if (value[x]) {
        setQueryOptions((val) => ({ ...val, [x]: value[x] }));
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

    setQueryOptions(() => ({
      ...clearFilterQuery,
    }));
  };

  return {
    result,
    error,
    isLoading,
    roles,
    refetch,
    setQueryOptions,
    queryOptions,
    handleFilter,
    clearFilter,
  };
};

export default useQueryCuratorials;
