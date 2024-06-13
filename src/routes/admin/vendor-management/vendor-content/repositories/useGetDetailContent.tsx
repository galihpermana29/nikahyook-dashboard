import { FormInstance } from 'antd';
import { DashboardProductAPI } from '@/shared/repositories/productService';
import { useQuery } from 'react-query';
import { IVendorLocation } from '../../vendor-user-management/view/container/Create/VendorUserCreate';
import { getCoverageArea } from '../usecase/get-coverage-area';

const useQueryVendorContentsDetail = (
  id: string,
  form: FormInstance<any>,
  setLocationState: React.Dispatch<React.SetStateAction<IVendorLocation>>,
  setActiveCoverage: any
) => {
  const getDetail = async () => {
    const { data } = await DashboardProductAPI.getProductDetail(id as string);
    const { provinces, cities } = getCoverageArea(data.coverage_area);
    setLocationState(data.location);
    setActiveCoverage({ city: cities, province: provinces });

    form!.setFieldsValue({
      ...data,
      province: data.location.province.value,
      city: data.location.city.value,
      village: data.location.village.value,
      district: data.location.district.value,
      postal_code: data.location.postal_code,
      tags: data.tags.map((dx) => dx.id),
      coverage_province: provinces,
      coverage_city: cities,
    });
    return data;
  };

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['vendor-content-detail', id],
    queryFn: getDetail,
    enabled: id ? true : false,
    retryOnMount: false,
    refetchOnWindowFocus: false,
  });

  return {
    data,
    error,
    isLoading,
    refetch,
  };
};

export default useQueryVendorContentsDetail;
