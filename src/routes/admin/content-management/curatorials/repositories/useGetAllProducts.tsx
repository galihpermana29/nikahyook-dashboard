import { DashboardProductAPI } from '@/shared/repositories/productService';
import useConvertQuery from '@/shared/usecase/useConvertQuery';
import useSuccessAxios from '@/shared/usecase/useSuccessAxios';
import { useQuery } from 'react-query';

const useGetAllProducts = () => {
  const { addIndexToData } = useSuccessAxios();
  const { objectToQueryParams } = useConvertQuery();

  const getVendorContent = async () => {
    const queryParams = objectToQueryParams({ is_pagination: false });
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
    queryKey: ['vendor-content', { is_pagination: false }],
    queryFn: getVendorContent,
  });

  return {
    result,
    error,
    isLoading,
    refetch,
  };
};

export default useGetAllProducts;
