import { TGeneralFilter } from '@/shared/models/generalInterfaces';
import { DashboardTransactionAPI } from '@/shared/repositories/transactionServices';
import useConvertQuery from '@/shared/usecase/useConvertQuery';
import useSuccessAxios from '@/shared/usecase/useSuccessAxios';
import { useDebounce } from '@uidotdev/usehooks';
import { FormInstance } from 'antd';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';

const useQueryAdminTransaction = (form: FormInstance<any>) => {
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
  };

  const [queryAdminTransaction, setQueryAdminTransaction] =
    useState<TGeneralFilter>({
      limit: limit ? parseInt(limit) : initialFilterState.limit,
      page: page ? parseInt(page) : initialFilterState.page,
      keyword: keyword ? keyword : initialFilterState.keyword,
      status: status ? status : initialFilterState.status,
    });

  const { objectToQueryParams } = useConvertQuery();
  const { addIndexToData } = useSuccessAxios();
  const queries = useDebounce(queryAdminTransaction, 1000);

  const getVendorContent = async () => {
    const queryParams = objectToQueryParams(queryAdminTransaction);
    setSearchParams(queryParams);
    const { data, meta_data } =
      await DashboardTransactionAPI.getAllTransactions(queryParams);
    return { data: addIndexToData(data), meta_data };
  };

  const {
    data: result,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['admin-transaction', { ...queries }],
    queryFn: getVendorContent,
  });

  const handleFilter = (value: any) => {
    for (const x in value) {
      if (value[x]) {
        setQueryAdminTransaction((val) => ({ ...val, [x]: value[x] }));
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

    setQueryAdminTransaction(() => ({
      ...clearFilterQuery,
    }));
  };

  return {
    result,
    error,
    isLoading,
    refetch,
    setQueryAdminTransaction,
    queryAdminTransaction,
    handleFilter,
    clearFilter,
  };
};

export default useQueryAdminTransaction;
