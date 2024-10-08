import type { ICuratorialPayload } from '@/shared/models/curatorialInterfaces';
import { CuratorialsAPI } from '@/shared/repositories/curatorialServices';
import useErrorAxios from '@/shared/usecase/useErrorAxios';
import useSuccessAxios from '@/shared/usecase/useSuccessAxios';
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

const useMutateUpdateCuratorial = (refetch?: () => void) => {
  const navigate = useNavigate();
  const { generateErrorMsg, showPopError } = useErrorAxios();
  const { showSuccessMessage } = useSuccessAxios();

  const editCuratorial = async (payload: ICuratorialPayload, id: number) => {
    const newPayload = {
      id: id,
      ...payload,
      status: payload.status ?? 'active',
      images: payload.images?.length > 0 ? payload.images : [''],
      products: payload.products.map((id) => ({ id })),
      inspirations: payload.inspirations.map((id) => ({ id })),
    };

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
      return editCuratorial(payload, id);
    },
    onError: handleError,
    onSuccess: () => {
      refetch!();
      showSuccessMessage('Curatorial has successfully edited!');
      navigate('/curatorial');
    },
  });

  return { mutate, error, isLoading };
};

export default useMutateUpdateCuratorial;
