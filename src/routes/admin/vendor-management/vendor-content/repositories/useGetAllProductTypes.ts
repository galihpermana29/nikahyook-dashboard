import { DashboardProductAPI } from '@/shared/repositories/productService';
import useConvertQuery from '@/shared/usecase/useConvertQuery';
import useSuccessAxios from '@/shared/usecase/useSuccessAxios';
import { useQuery } from 'react-query';

const useQueryProductTypes = () => {
  const { objectToQueryParams } = useConvertQuery();
  const { addIndexToData } = useSuccessAxios();

  const getProductTypes = async () => {
    const queryParams = objectToQueryParams({
      is_pagination: false,
      status: 'active',
    });

    const { data } = await DashboardProductAPI.getAllProductTypes(queryParams);

    return {
      data: addIndexToData(data),
      selectOptions: data.map((dx) => ({
        value: dx.id,
        label: dx.name,
      })),
    };
  };

  const {
    data: result,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['vendor-product-type'],
    queryFn: getProductTypes,
    staleTime: Infinity,
  });

  return { result, error, isLoading, refetch };
};

export default useQueryProductTypes;
