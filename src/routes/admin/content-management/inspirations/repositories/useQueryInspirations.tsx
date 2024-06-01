import type { TGeneralFilter } from '@/shared/models/generalInterfaces';
import { InspirationAPI } from '@/shared/repositories/inspirationService';
import useConvertQuery from '@/shared/usecase/useConvertQuery';
import useSuccessAxios from '@/shared/usecase/useSuccessAxios';
import { useDebounce } from '@uidotdev/usehooks';
import type { FormInstance } from 'antd';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';

export default function useQueryInspirations(form: FormInstance<any>) {
  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = searchParams.get('keyword');
  const status = searchParams.get('status');
  const limit = searchParams.get('limit');
  const page = searchParams.get('page');
  const tags = searchParams.get('tags');

  // Default filter state
  const initialFilterState: TGeneralFilter = {
    limit: 9,
    page: 1,
    keyword: '',
    status: 'default',
    tags: [],
  };

  // Change filter state based on searchParams
  // use default filter state if its searchParams' key doesn't exist
  const [query, setQuery] = useState<TGeneralFilter>({
    limit: limit ? parseInt(limit) : initialFilterState.limit,
    page: page ? parseInt(page) : initialFilterState.page,
    keyword: keyword ?? initialFilterState.keyword,
    status: status ?? initialFilterState.status,
    tags: [tags ?? ''],
  });

  const { objectToQueryParams } = useConvertQuery();
  const { addIndexToData } = useSuccessAxios();
  const queries = useDebounce(query, 1000);

  const handleFilter = (value: any) => {
    for (const x in value) {
      if (value[x]) {
        setQuery((val) => ({ ...val, [x]: value[x] }));
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

    setQuery(() => ({
      ...clearFilterQuery,
    }));
  };

  const getInspirations = async () => {
    const queryParams = objectToQueryParams(query);
    setSearchParams(queryParams);
    const { data: result, meta_data } = await InspirationAPI.getAllInspirations(
      queryParams
    );
    const { dataToSelectOptions } = useSuccessAxios();

    const data = result.map((item) => ({
      ...item,
      tags: dataToSelectOptions(item.tags, 'id', 'name'),
    }));

    return { data: addIndexToData(data), meta_data };
  };

  const {
    data: result,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['inspirations', { ...queries }],
    queryFn: getInspirations,
  });

  return {
    result,
    error,
    isLoading,
    refetch,
    setQuery,
    query,
    handleFilter,
    clearFilter,
  };
}
