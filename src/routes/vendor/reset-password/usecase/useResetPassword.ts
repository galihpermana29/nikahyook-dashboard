import type { IResetPasswordPayloadRoot } from '@/shared/models/userServicesInterface';
import { DashboardUserAPI } from '@/shared/repositories/userServices';
import useErrorAxios from '@/shared/usecase/useErrorAxios';
import useSuccessAxios from '@/shared/usecase/useSuccessAxios';
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const useResetPassword = () => {
  const { generateErrorMsg, showPopError } = useErrorAxios();
  const { showSuccessMessage } = useSuccessAxios();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  const resetPassword = async (payload: IResetPasswordPayloadRoot) => {
    if (!token) throw new AxiosError('No token!');
    const data = await DashboardUserAPI.resetPassword(payload, token);
    return data;
  };

  const handleError = (error: AxiosError) => {
    const msg = generateErrorMsg(error);
    showPopError(msg);
  };

  const { mutate, error, isLoading } = useMutation({
    mutationFn: (payload: IResetPasswordPayloadRoot) => resetPassword(payload),
    onError: handleError,
    onSuccess: () => {
      showSuccessMessage('Berhasil mengatur ulang password Anda!');
      return navigate('/login');
    },
  });

  return { mutate, error, isLoading };
};
