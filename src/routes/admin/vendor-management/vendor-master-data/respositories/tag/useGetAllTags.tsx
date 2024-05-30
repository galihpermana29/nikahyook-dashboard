import { TGeneralFilter } from '@/shared/models/generalInterfaces';
import { DashboardProductAPI } from '@/shared/repositories/productService';
import useConvertQuery from '@/shared/usecase/useConvertQuery';
import useSuccessAxios from '@/shared/usecase/useSuccessAxios';
import { useDebounce } from '@uidotdev/usehooks';
import { FormInstance } from 'antd';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';

const useQueryProductTags = (form: FormInstance<any>) => {
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

  const [queryProductTags, setQueryProductTags] = useState<TGeneralFilter>({
    limit: limit ? parseInt(limit) : initialFilterState.limit,
    page: page ? parseInt(page) : initialFilterState.page,
    keyword: keyword ?? initialFilterState.keyword,
    status: status ?? initialFilterState.status,
  });

  const { objectToQueryParams } = useConvertQuery();
  const { addIndexToData } = useSuccessAxios();
  const queries = useDebounce(queryProductTags, 1000);

  const getProducTags = async () => {
    const queryParams = objectToQueryParams(queryProductTags);
    setSearchParams(queryParams);

    const { data, meta_data } = await DashboardProductAPI.getAllProductTags(
      queryParams
    );

    return { data: addIndexToData(data), meta_data };
  };

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['tags', { ...queries }],
    queryFn: getProducTags,
  });

  const handleFilter = (value: any) => {
    for (const x in value) {
      if (value[x]) {
        setQueryProductTags((val) => ({ ...val, [x]: value[x] }));
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

    setQueryProductTags(() => ({
      ...clearFilterQuery,
    }));
  };

  return {
    data,
    error,
    isLoading,
    refetch,
    setQueryProductTags,
    queryProductTags,
    handleFilter,
    clearFilter,
  };
};

export default useQueryProductTags;
