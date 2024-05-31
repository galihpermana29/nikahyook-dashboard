import type { ICreateInspirationPayloadRoot } from '@/shared/models/inspirationInterfaces';
import { InspirationAPI } from '@/shared/repositories/inspirationService';
import useErrorAxios from '@/shared/usecase/useErrorAxios';
import useSuccessAxios from '@/shared/usecase/useSuccessAxios';
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';

const useMutateCreateInspirations = (
  closeModal?: () => void,
  refetch?: () => void
) => {
  const { generateErrorMsg, showPopError } = useErrorAxios();
  const { showSuccessMessage } = useSuccessAxios();

  const createInspirations = async (payload: ICreateInspirationPayloadRoot) => {
    const data = await InspirationAPI.createInspiration(payload);

    return data;
  };

  const handleError = (error: AxiosError) => {
    const msg = generateErrorMsg(error);
    showPopError(msg);
  };

  const { mutate, error, isLoading } = useMutation({
    mutationFn: (payload: ICreateInspirationPayloadRoot) =>
      createInspirations(payload),
    onError: handleError,
    onSuccess: () => {
      closeModal!();
      refetch!();
      showSuccessMessage('Inspiration successfully added!');
    },
  });
  return { mutate, error, isLoading };
};

export default useMutateCreateInspirations;
