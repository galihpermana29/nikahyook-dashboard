import type {
  ICreateCuratorialPayloadRoot,
  ICuratorialInputRoot,
} from '@/shared/models/curatorialInterfaces';
import { CuratorialsAPI } from '@/shared/repositories/curatorialServices';
import useErrorAxios from '@/shared/usecase/useErrorAxios';
import useSuccessAxios from '@/shared/usecase/useSuccessAxios';
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';

const useMutateCreateCuratorials = (refetch?: () => void) => {
  const { generateErrorMsg, showPopError } = useErrorAxios();
  const { showSuccessMessage } = useSuccessAxios();

  // TODO: change type of payload to ICreateCuratorialInputRoot
  const createCuratorial = async (payload: ICuratorialInputRoot) => {
    const newPayload = {
      ...payload,
      products: payload.products.map((productId) => ({ id: productId })),
      inspirations: payload.inspirations.map((inspirationId) => ({
        id: inspirationId,
      })),
    } as ICreateCuratorialPayloadRoot;

    const data = await CuratorialsAPI.createCuratorial(newPayload);

    return data;
  };

  const handleError = (error: AxiosError) => {
    const msg = generateErrorMsg(error);
    showPopError(msg);
  };

  const { mutate, error, isLoading } = useMutation({
    mutationFn: (payload: ICuratorialInputRoot) => createCuratorial(payload),
    onError: handleError,
    onSuccess: () => {
      refetch!();
      showSuccessMessage('Curatorial successfully added!');
    },
  });
  return { mutate, error, isLoading };
};

export default useMutateCreateCuratorials;
