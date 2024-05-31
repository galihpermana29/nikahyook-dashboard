import { DashboardProductAPI } from '@/shared/repositories/productService';
import { FormInstance } from 'antd';
import { TModalState } from '@/shared/usecase/useModalReducer';
import { useQuery } from 'react-query';

const useQueryProductTypeDetail = (
  modalState?: TModalState,
  form?: FormInstance<any>
) => {
  const getDetail = async () => {
    const { data } = await DashboardProductAPI.getProductTypeDetail(
      modalState?.id as string
    );

    form!.setFieldsValue({
      ...data,
    });

    return data;
  };

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['vendor-product-type-detail', modalState?.id],
    queryFn: getDetail,
    enabled: modalState?.id ? true : false,
  });

  return { data, error, isLoading, refetch };
};

export default useQueryProductTypeDetail;
