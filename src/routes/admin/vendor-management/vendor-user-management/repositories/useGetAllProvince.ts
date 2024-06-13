import { TEmsifaAPIResponse } from '@/shared/models/generalInterfaces';
import axios from 'axios';
import { useQuery } from 'react-query';

const useQueryProvince = () => {
  const getAllProvince = async () => {
    const { data }: { data: TEmsifaAPIResponse[] } = await axios.get(
      'https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json'
    );
    return data?.map((dx) => ({ value: dx.id, label: dx.name }));
  };

  const {
    data: result,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['province'],
    queryFn: getAllProvince,
    refetchOnWindowFocus: false,
  });

  return {
    result,
    error,
    isLoading,
    refetch,
  };
};

export default useQueryProvince;
