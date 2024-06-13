import { TEmsifaAPIResponse } from '@/shared/models/generalInterfaces';
import axios from 'axios';
import { useQuery } from 'react-query';

const useQueryDistrict = (id?: string) => {
  const getAllDistrict = async () => {
    const { data }: { data: TEmsifaAPIResponse[] } = await axios.get(
      `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${id}.json`
    );
    return data?.map((dx) => ({ value: dx.id, label: dx.name }));
  };

  const {
    data: result,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['district', id],
    queryFn: getAllDistrict,
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

export default useQueryDistrict;
