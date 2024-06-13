import { ICreateUserAdminPayload } from '@/shared/models/userServicesInterface';
import { DashboardUserAPI } from '@/shared/repositories/userServices';
import useErrorAxios from '@/shared/usecase/useErrorAxios';
import useSuccessAxios from '@/shared/usecase/useSuccessAxios';
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';

const useMutateCreateAdmins = (
  closeModal?: () => void,
  refetch?: () => void
) => {
  const { generateErrorMsg, showPopError } = useErrorAxios();
  const { showSuccessMessage } = useSuccessAxios();

  const createAdmins = async (payload: ICreateUserAdminPayload) => {
    const data = await DashboardUserAPI.createUser({
      ...payload,
      type: 'admin',
      phone_number: (payload.phone_number as unknown as number).toString(),
    });

    return data;
  };

  const handleError = (error: AxiosError) => {
    const msg = generateErrorMsg(error);
    showPopError(msg);
  };

  const { mutate, error, isLoading } = useMutation({
    mutationFn: (payload: ICreateUserAdminPayload) => createAdmins(payload),
    onError: handleError,
    onSuccess: () => {
      closeModal!();
      refetch!();
      showSuccessMessage('Admin successfully added!');
    },
  });
  return { mutate, error, isLoading };
};

export default useMutateCreateAdmins;
