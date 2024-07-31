import type {
  ICuratorialInputRoot,
  ICuratorialPayload,
} from '@/shared/models/curatorialInterfaces';
import { CuratorialsAPI } from '@/shared/repositories/curatorialServices';
import useErrorAxios from '@/shared/usecase/useErrorAxios';
import useSuccessAxios from '@/shared/usecase/useSuccessAxios';
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';

const useMutateUpdateCuratorial = (
  closeModal?: () => void,
  refetch?: () => void
) => {
  const { generateErrorMsg, showPopError } = useErrorAxios();
  const { showSuccessMessage } = useSuccessAxios();

  const deleteCuratorial = async (payload: ICuratorialPayload, id: number) => {
    const newPayload = {
      ...payload,
      status: 'inactive',
      products: payload.products.map((productId) => ({ id: productId })),
      inspirations: payload.inspirations.map((inspirationId) => ({
        id: inspirationId,
      })),
    } as ICuratorialInputRoot;

    const data = await CuratorialsAPI.editCuratorial(newPayload, id);
    return data;
  };
  const handleError = (error: AxiosError) => {
    const msg = generateErrorMsg(error);
    showPopError(msg);
  };

  const { mutate, error, isLoading } = useMutation({
    mutationFn: ({
      payload,
      id,
    }: {
      payload: ICuratorialPayload;
      id: number;
    }) => {
      return deleteCuratorial(payload, id);
    },
    onError: handleError,
    onSuccess: () => {
      closeModal!();
      refetch!();
      showSuccessMessage('Successfully deleted curatorial!');
    },
  });

  return { mutate, error, isLoading };
};

export default useMutateUpdateCuratorial;
