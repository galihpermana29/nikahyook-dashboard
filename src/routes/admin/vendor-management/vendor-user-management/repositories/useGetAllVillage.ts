import { TEmsifaAPIResponse } from '@/shared/models/generalInterfaces';
import axios from 'axios';
import { useQuery } from 'react-query';

const useQueryVillage = (id?: string) => {
  const getAllVillage = async () => {
    const { data }: { data: TEmsifaAPIResponse[] } = await axios.get(
      `https://www.emsifa.com/api-wilayah-indonesia/api/villages/${id}.json`
    );
    return data?.map((dx) => ({ value: dx.id, label: dx.name }));
  };

  const {
    data: result,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['village', id],
    queryFn: getAllVillage,
    enabled: id ? true : false,
    refetchOnWindowFocus: false,
  });

  return {
    result,
    error,
    isLoading,
    refetch,
  };
};

export default useQueryVillage;
