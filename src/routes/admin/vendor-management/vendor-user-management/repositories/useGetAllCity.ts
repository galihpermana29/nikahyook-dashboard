import { TEmsifaAPIResponse } from '@/shared/models/generalInterfaces';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

const useQueryCity = (id?: string, isCoverage?: boolean) => {
  const [listAllCoverageCities, setListAllCoverageCities] = useState<any[]>([]);
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
    enabled: id && !isCoverage ? true : false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const getLisCitiesCoverage = async () => {
      if (id) {
        const promises = (id as any).map((dx) =>
          axios.get(
            `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${dx.value}.json`
          )
        );
        const datas = await Promise.all(promises);

        if (datas.length > 0) {
          const listCities: any[] = [];

          datas.forEach((dx) => {
            const mapped = dx.data.map((dy) => ({
              value: dy.id,
              label: dy.name,
            }));
            listCities.push(...mapped);
          });
          setListAllCoverageCities(listCities);
        }
      }
    };

    if (isCoverage) {
      getLisCitiesCoverage();
    }
  }, [id]);

  return {
    result,
    error,
    isLoading,
    refetch,
    listAllCoverageCities,
  };
};

export default useQueryCity;
