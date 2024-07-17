import { TGeneralFilter } from '@/shared/models/generalInterfaces';
import { DashboardTransactionAPI } from '@/shared/repositories/transactionServices';
import useConvertQuery from '@/shared/usecase/useConvertQuery';
import useSuccessAxios from '@/shared/usecase/useSuccessAxios';
import { useDebounce } from '@uidotdev/usehooks';
import { FormInstance } from 'antd';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';

const useQueryVendorTransaction = (form: FormInstance<any>) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const limit = searchParams.get('limit');
  const page = searchParams.get('page');
  const keyword = searchParams.get('keyword');
  const status = searchParams.get('status');

  const initialFilterState: TGeneralFilter = {
    limit: 10,
    page: 1,
    keyword: '',
    status: 'default',
    vendor_id: '',
  };

  const [queryVendorTransaction, setQueryVendorTransaction] =
    useState<TGeneralFilter>({
      limit: limit ? parseInt(limit) : initialFilterState.limit,
      page: page ? parseInt(page) : initialFilterState.page,
      keyword: keyword ? keyword : '',
      status: status ? status : 'default',
      vendor_id: JSON.parse(localStorage.getItem('admin')!).user_id,
    });

  const { objectToQueryParams } = useConvertQuery();
  const { addIndexToData } = useSuccessAxios();
  const queries = useDebounce(queryVendorTransaction, 1000);

  const getVendorContent = async () => {
    const queryParams = objectToQueryParams(queryVendorTransaction);
    setSearchParams(queryParams);
    const { data, meta_data } =
      await DashboardTransactionAPI.getTransactionsByVendorId(queryParams);
    return { data: addIndexToData(data), meta_data };
  };

  const {
    data: result,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['vendor-transaction', { ...queries }],
    queryFn: getVendorContent,
  });

  const handleFilter = (value: any) => {
    for (const x in value) {
      if (value[x]) {
        setQueryVendorTransaction((val) => ({ ...val, [x]: value[x] }));
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

    setQueryVendorTransaction(() => ({
      ...clearFilterQuery,
    }));
  };

  return {
    result,
    error,
    isLoading,
    refetch,
    setQueryVendorTransaction,
    queryVendorTransaction,
    handleFilter,
    clearFilter,
  };
};

export default useQueryVendorTransaction;
