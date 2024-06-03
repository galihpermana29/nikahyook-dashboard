import { FormInstance } from 'antd';
import { useQuery } from 'react-query';
import { CuratorialsAPI } from '@/shared/repositories/curatorialServices';
import type { ICuratorialInputRoot } from '@/shared/models/curatorialInterfaces';

const useQueryCuratorialDetail = (
  id: string,
  form?: FormInstance<ICuratorialInputRoot>
) => {
  const getDetail = async () => {
    const { data } = await CuratorialsAPI.getCuratorialById(id);

    form!.setFieldsValue({
      ...data,
      inspirations: data.inspirations.map((inspiration) => inspiration.id),
      products: data.products.map((product) => product.id),
    });

    return data;
  };

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['curatorial-detail', { id }],
    queryFn: getDetail,
  });

  return { data, error, isLoading, refetch };
};

export default useQueryCuratorialDetail;
