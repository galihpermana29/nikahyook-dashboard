import axios from 'axios';
import { useQuery } from 'react-query';

const useQueryPostalCode = (id?: string) => {
  const getPostalCode = async () => {
    const {
      data: { data },
    } = await axios.get(`https://kodepos.vercel.app/search/?q=${id}`);
    return data[0];
  };

  const {
    data: result,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['postal'],
    queryFn: getPostalCode,
    enabled: id ? true : false,
  });

  return {
    result,
    error,
    isLoading,
    refetch,
  };
};

export default useQueryPostalCode;
