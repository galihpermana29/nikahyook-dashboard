import { InspirationAPI } from '@/shared/repositories/inspirationService';
import useConvertQuery from '@/shared/usecase/useConvertQuery';
import useSuccessAxios from '@/shared/usecase/useSuccessAxios';
import { useQuery } from 'react-query';

export default function useGetAllInspirations() {
  const { addIndexToData } = useSuccessAxios();
  const { objectToQueryParams } = useConvertQuery();

  const getInspirations = async () => {
    const queryParams = objectToQueryParams({ is_pagination: false });
    const { data: result, meta_data } = await InspirationAPI.getAllInspirations(
      queryParams
    );

    const { dataToSelectOptions } = useSuccessAxios();

    const data = result.map((item) => ({
      ...item,
      tags: dataToSelectOptions(item.tags, 'id', 'name'),
    }));

    return { data: addIndexToData(data), meta_data };
  };

  const {
    data: result,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['inspirations', { is_pagination: false }],
    queryFn: getInspirations,
  });

  return {
    result,
    error,
    isLoading,
    refetch,
  };
}
