import type { IRequestResetEmailPayloadRoot } from '@/shared/models/userServicesInterface';
import { DashboardUserAPI } from '@/shared/repositories/userServices';
import useErrorAxios from '@/shared/usecase/useErrorAxios';
import useSuccessAxios from '@/shared/usecase/useSuccessAxios';
import type { AxiosError } from 'axios';
import { useMutation } from 'react-query';

export const useRequestResetEmail = () => {
  const { generateErrorMsg, showPopError } = useErrorAxios();
  const { showSuccessMessage } = useSuccessAxios();

  const requestResetEmail = async (payload: IRequestResetEmailPayloadRoot) => {
    const data = await DashboardUserAPI.requestResetEmail(payload);
    return data;
  };

  const handleError = (error: AxiosError) => {
    const msg = generateErrorMsg(error);
    showPopError(msg);
  };

  const { mutate, error, isLoading } = useMutation({
    mutationFn: (payload: IRequestResetEmailPayloadRoot) =>
      requestResetEmail(payload),
    onError: handleError,
    onSuccess: () => {
      showSuccessMessage('Kami telah mengirimkan Anda email.');
    },
  });

  return { mutate, error, isLoading };
};
