import { DashboardVendorTypeAPI } from '@/shared/repositories/vendorTypeService';
import { FormInstance } from 'antd';
import { TGeneralFilter } from '@/shared/models/generalInterfaces';
import { useDebounce } from '@uidotdev/usehooks';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import useConvertQuery from '@/shared/usecase/useConvertQuery';
import useSuccessAxios from '@/shared/usecase/useSuccessAxios';

const useQueryVendorTypes = (form: FormInstance<any>) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = searchParams.get('keyword');
  const status = searchParams.get('status');
  const limit = searchParams.get('limit');
  const page = searchParams.get('page');

  const initialFilterState: TGeneralFilter = {
    limit: 10,
    page: 1,
    keyword: '',
    status: 'default',
  };

  const [queryVendorTypes, setQueryVendorTypes] = useState<TGeneralFilter>({
    limit: limit ? parseInt(limit) : initialFilterState.limit,
    page: page ? parseInt(page) : initialFilterState.page,
    keyword: keyword ?? initialFilterState.keyword,
    status: status ?? initialFilterState.status,
  });

  const { objectToQueryParams } = useConvertQuery();
  const { addIndexToData } = useSuccessAxios();
  const queries = useDebounce(queryVendorTypes, 1000);

  const getVendorTypes = async () => {
    const queryParams = objectToQueryParams(queryVendorTypes);
    setSearchParams(queryParams);

    const { data, meta_data } =
      await DashboardVendorTypeAPI.getAllVendorTypes(queryParams);

    return { data: addIndexToData(data), meta_data };
  };

  const {
    data: result,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['vendor-vendor-type', { ...queries }],
    queryFn: getVendorTypes,
  });

  const handleFilter = (value: any) => {
    for (const x in value) {
      if (value[x]) {
        setQueryVendorTypes((val) => ({ ...val, [x]: value[x] }));
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

    setQueryVendorTypes(() => ({
      ...clearFilterQuery,
    }));
  };

  return {
    result,
    error,
    isLoading,
    refetch,
    setQueryVendorTypes,
    queryVendorTypes,
    handleFilter,
    clearFilter,
  };
};

export default useQueryVendorTypes;
