import { DashboardVendorTypeAPI } from '@/shared/repositories/vendorTypeService';
import useConvertQuery from '@/shared/usecase/useConvertQuery';
import { useQuery } from 'react-query';

const useQueryVendorTypes = () => {
  const { objectToQueryParams } = useConvertQuery();

  const getVendorTypes = async () => {
    const queryParams = objectToQueryParams({
      status: 'active',
      is_pagination: false,
    });

    const { data: result, meta_data } =
      await DashboardVendorTypeAPI.getAllVendorTypes(queryParams);

    const data = result
      .filter((type) => type.status === 'active')
      .map((type) => ({
        label: type.name,
        value: type.id,
      }));

    return { data, meta_data };
  };

  const {
    data: result,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['vendor-types'],
    queryFn: getVendorTypes,
  });

  return {
    result,
    error,
    isLoading,
    refetch,
  };
};

export default useQueryVendorTypes;
