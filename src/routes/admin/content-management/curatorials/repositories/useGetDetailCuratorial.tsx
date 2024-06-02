import { FormInstance } from 'antd';
import { useQuery } from 'react-query';
import { CuratorialsAPI } from '@/shared/repositories/curatorialServices';

const useQueryCuratorialDetail = (id: string, form?: FormInstance<any>) => {
  const getDetail = async () => {
    const { data } = await CuratorialsAPI.getCuratorialById(id);

    form!.setFieldsValue(data);
    return data;
  };

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['curatorial-detail', { id }],
    queryFn: getDetail,
  });

  return { data, error, isLoading, refetch };
};

export default useQueryCuratorialDetail;
