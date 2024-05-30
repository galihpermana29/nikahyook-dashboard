import { TGeneralFilter } from '@/shared/models/generalInterfaces';
import { DashboardProductAPI } from '@/shared/repositories/productService';
import useConvertQuery from '@/shared/usecase/useConvertQuery';
import useSuccessAxios from '@/shared/usecase/useSuccessAxios';
import { useDebounce } from '@uidotdev/usehooks';
import { FormInstance } from 'antd';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';

const useQueryVendorContent = (form: FormInstance<any>) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const limit = searchParams.get('limit');
  const page = searchParams.get('page');
  const keyword = searchParams.get('keyword');
  const status = searchParams.get('status');
  const tags = searchParams.getAll('tags').filter((tag) => tag !== '');
  const maxPrice = searchParams.get('max_price');
  const minPrice = searchParams.get('min_price');

  const initialFilterState: TGeneralFilter = {
    limit: 10,
    page: 1,
    keyword: '',
    tags: [],
    status: 'default',
    max_price: '',
    min_price: '',
  };

  const [queryVendorContent, setQueryVendorContent] = useState<TGeneralFilter>({
    limit: limit ? parseInt(limit) : initialFilterState.limit,
    page: page ? parseInt(page) : initialFilterState.page,
    keyword: keyword ? keyword : '',
    status: status ? status : 'default',
    tags: tags ? tags : [''],
    max_price: maxPrice ? maxPrice : '',
    min_price: minPrice ? minPrice : '',
  });

  const { objectToQueryParams } = useConvertQuery();
  const { addIndexToData } = useSuccessAxios();
  const queries = useDebounce(queryVendorContent, 1000);

  const getVendorContent = async () => {
    const queryParams = objectToQueryParams(queryVendorContent);
    setSearchParams(queryParams);
    const { data, meta_data } = await DashboardProductAPI.getAllProducts(
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
    queryKey: ['vendor-content', { ...queries }],
    queryFn: getVendorContent,
  });

  const handleFilter = (value: any) => {
    for (const x in value) {
      if (value[x]) {
        setQueryVendorContent((val) => ({ ...val, [x]: value[x] }));
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

    setQueryVendorContent(() => ({
      ...clearFilterQuery,
    }));
  };

  return {
    result,
    error,
    isLoading,
    refetch,
    setQueryVendorContent,
    queryVendorContent,
    handleFilter,
    clearFilter,
  };
};

export default useQueryVendorContent;
