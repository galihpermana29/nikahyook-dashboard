import { DashboardTransactionAPI } from '@/shared/repositories/transactionServices';
import { useQuery } from 'react-query';

const useQueryVendorTransactionDetail = (id: string) => {
  const getDetail = async () => {
    const data = await DashboardTransactionAPI.getTransactionDetail(
      id as string
    );

    return data;
  };

  const {
    data: result,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['vendor-transaction-detail', id],
    queryFn: getDetail,
    enabled: id ? true : false,
    refetchOnWindowFocus: false,
  });

  return { result, error, isLoading, refetch };
};

export default useQueryVendorTransactionDetail;
