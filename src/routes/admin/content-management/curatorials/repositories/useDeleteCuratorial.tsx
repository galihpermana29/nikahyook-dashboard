import type { IUpdateCuratorialPayloadRoot } from '@/shared/models/curatorialInterfaces';
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

  const deleteCuratorial = async (
    payload: IUpdateCuratorialPayloadRoot,
    id: number
  ) => {
    const newPayload = {
      ...payload,
      status: 'inactive',
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
      payload: IUpdateCuratorialPayloadRoot;
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
