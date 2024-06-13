import { TEmsifaAPIResponse } from '@/shared/models/generalInterfaces';
import axios from 'axios';
import { useQuery } from 'react-query';

const useQueryCity = (id?: string) => {
  const getAllCity = async () => {
    const { data }: { data: TEmsifaAPIResponse[] } = await axios.get(
      `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${id}.json`
    );
    return data?.map((dx) => ({ value: dx.id, label: dx.name }));
  };

  const {
    data: result,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['cities', id],
    queryFn: getAllCity,
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

export default useQueryCity;
