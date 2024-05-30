import { DashboardVendorTypeAPI } from '@/shared/repositories/vendorTypeService';
import { FormInstance } from 'antd';
import { TModalState } from '../../usecase/useModalReducer';
import { useQuery } from 'react-query';

const useQueryVendorTypeDetail = (
  modalState?: TModalState,
  form?: FormInstance<any>
) => {
  const getDetail = async () => {
    const { data } = await DashboardVendorTypeAPI.getVendorTypeDetail(
      modalState?.id as string
    );

    form!.setFieldsValue({
      ...data,
    });

    return data;
  };

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['vendor-vendor-type-detail', modalState?.id],
    queryFn: getDetail,
    enabled: modalState?.id ? true : false,
  });

  return {
    data,
    error,
    isLoading,
    refetch,
  };
};

export default useQueryVendorTypeDetail;
