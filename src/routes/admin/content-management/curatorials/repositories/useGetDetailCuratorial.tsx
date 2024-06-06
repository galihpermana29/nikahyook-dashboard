import { useQuery } from 'react-query';
import { CuratorialsAPI } from '@/shared/repositories/curatorialServices';
import type { ICuratorialInputRoot } from '@/shared/models/curatorialInterfaces';

const useQueryCuratorialDetail = (id: string) => {
  const getDetail = async () => {
    const { data } = await CuratorialsAPI.getCuratorialById(id);

    const newFieldsValue = {
      ...data,
      images: data.images[0] === '' ? [] : data.images,
      inspirations: data.inspirations.map((inspiration) => inspiration.id),
      products: data.products.map((product) => product.id),
    } as ICuratorialInputRoot;

    return newFieldsValue;
  };

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['curatorial-detail', { id }],
    queryFn: getDetail,
  });

  return { data, error, isLoading, refetch };
};

export default useQueryCuratorialDetail;
