import { DashboardReviewAPI } from '@/shared/repositories/reviewService';
import { FormInstance } from 'antd';
import { TGeneralFilter } from '@/shared/models/generalInterfaces';
import { useDebounce } from '@uidotdev/usehooks';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import useConvertQuery from '@/shared/usecase/useConvertQuery';
import useSuccessAxios from '@/shared/usecase/useSuccessAxios';

const useQueryReviews = (form: FormInstance<any>) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = searchParams.get('keyword');
  const product_id = searchParams.get('product_id');

  const initialFilterState: TGeneralFilter = {
    keyword: '',
    product_id: undefined,
  };

  const [queryReviews, setQueryReviews] = useState<TGeneralFilter>({
    keyword: keyword ?? initialFilterState.keyword,
    product_id: product_id ? Number(product_id) : undefined,
  });

  const { objectToQueryParams } = useConvertQuery();
  const { addIndexToData } = useSuccessAxios();
  const queries = useDebounce(queryReviews, 1000);

  const getReviews = async () => {
    const queryParams = objectToQueryParams({
      keyword: queryReviews.keyword,
      product_id: queryReviews.product_id,
    });
    setSearchParams(queryParams);
    const { data } = await DashboardReviewAPI.getAllReviews(queryParams);

    return { data: addIndexToData(data) };
  };

  const {
    data: result,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['vendor-reviews', { ...queries }],
    queryFn: getReviews,
  });

  const handleFilter = (value: any) => {
    for (const x in value) {
      if (value[x]) {
        setQueryReviews((val) => ({ ...val, [x]: value[x] }));
      }
    }
  };

  const clearFilter = () => {
    const clearFilterQuery = {
      keyword: '',
      product_id: undefined,
    };
    form.setFieldsValue(clearFilterQuery);
    setQueryReviews(clearFilterQuery);
  };

  return {
    result,
    error,
    isLoading,
    refetch,
    setQueryReviews,
    queryReviews,
    handleFilter,
    clearFilter,
  };
};

export default useQueryReviews;
