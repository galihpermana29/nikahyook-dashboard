import { FormInstance } from 'antd';
import { useQuery } from 'react-query';
import { TModalState } from '@/shared/usecase/useModalReducer';
import { DashboardUserAPI } from '@/shared/repositories/userServices';

const useQueryAdminsDetail = (
  modalState?: TModalState,
  form?: FormInstance<any>
) => {
  const getDetail = async () => {
    const { data } = await DashboardUserAPI.getUserById(
      modalState!.id as string
    );
    form!.setFieldsValue(data);
    return data;
  };

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['admin-detail', modalState!.id],
    queryFn: getDetail,
    enabled: modalState!.id ? true : false,
    refetchOnWindowFocus: false,
  });

  return { data, error, isLoading, refetch };
};

export default useQueryAdminsDetail;
