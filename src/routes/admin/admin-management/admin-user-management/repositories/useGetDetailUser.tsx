import { FormInstance } from 'antd';
import { useQuery } from 'react-query';
import { TModalState } from '@/shared/usecase/useModalReducer';
import { DashboardUserAPI } from '@/shared/repositories/userServices';
import dayjs from 'dayjs';

const useQueryAdminsDetail = (
  modalState?: TModalState,
  form?: FormInstance<any>
) => {
  const getDetail = async () => {
    const { data } = await DashboardUserAPI.getUserById(
      modalState!.id as string
    );

    form!.setFieldsValue({
      ...data,
      date_of_birth: dayjs(data.date_of_birth),
    });
    return data;
  };

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['admin-detail', modalState!.id],
    queryFn: getDetail,
    enabled: modalState!.id ? true : false,
  });

  return { data, error, isLoading, refetch };
};

export default useQueryAdminsDetail;
