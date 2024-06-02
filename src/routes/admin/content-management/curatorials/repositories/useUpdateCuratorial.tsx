import type { IUpdateCuratorialPayloadRoot } from '@/shared/models/curatorialInterfaces';
import { CuratorialsAPI } from '@/shared/repositories/curatorialServices';
import useErrorAxios from '@/shared/usecase/useErrorAxios';
import useSuccessAxios from '@/shared/usecase/useSuccessAxios';
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';

const useMutateUpdateCuratorial = (refetch?: () => void) => {
  const { generateErrorMsg, showPopError } = useErrorAxios();
  const { showSuccessMessage } = useSuccessAxios();

  const editCuratorial = async (
    payload: IUpdateCuratorialPayloadRoot,
    id: number
  ) => {
    const data = await CuratorialsAPI.editCuratorial(payload, id);
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
      payload: IUpdateCuratorialPayloadRoot;
      id: number;
    }) => {
      return editCuratorial(payload, id);
    },
    onError: handleError,
    onSuccess: () => {
      refetch!();
      showSuccessMessage('Curatorial has successfully edited!');
    },
  });

  return { mutate, error, isLoading };
};

export default useMutateUpdateCuratorial;
