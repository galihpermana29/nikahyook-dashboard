import { FormInstance } from 'antd';
import { useQuery } from 'react-query';
import { TModalState } from '@/shared/usecase/useModalReducer';
import { InspirationAPI } from '@/shared/repositories/inspirationService';
import useSuccessAxios from '@/shared/usecase/useSuccessAxios';

const useQueryInspirationById = (
  modalState?: TModalState,
  form?: FormInstance<any>
) => {
  const { dataToSelectOptions } = useSuccessAxios();

  const getDetail = async () => {
    const { data } = await InspirationAPI.getInspirationById(
      modalState?.id ?? ''
    );

    form!.setFieldsValue({
      ...data,
      tags: dataToSelectOptions(data.tags, 'id', 'name'),
    });
    return data;
  };

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['inspiration-detail', modalState!.id],
    queryFn: getDetail,
    enabled: modalState!.id ? true : false,
  });

  return { data, error, isLoading, refetch };
};

export default useQueryInspirationById;
