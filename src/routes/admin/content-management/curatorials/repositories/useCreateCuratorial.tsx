import type {
  ICreateCuratorialPayloadRoot,
  ICuratorialInputRoot,
} from '@/shared/models/curatorialInterfaces';
import { CuratorialsAPI } from '@/shared/repositories/curatorialServices';
import useErrorAxios from '@/shared/usecase/useErrorAxios';
import useSuccessAxios from '@/shared/usecase/useSuccessAxios';
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

const useMutateCreateCuratorials = () => {
  const navigate = useNavigate();
  const { generateErrorMsg, showPopError } = useErrorAxios();
  const { showSuccessMessage } = useSuccessAxios();

  const createCuratorial = async (payload: ICuratorialInputRoot) => {
    const newPayload = {
      ...payload,
      status: 'active',
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
      showSuccessMessage('Curatorial successfully added!');
      navigate('/curatorial');
    },
  });
  return { mutate, error, isLoading };
};

export default useMutateCreateCuratorials;
