import { IUpdateUserAdminPayload } from '@/shared/models/userServicesInterface';
import { DashboardUserAPI } from '@/shared/repositories/userServices';
import useErrorAxios from '@/shared/usecase/useErrorAxios';
import useSuccessAxios from '@/shared/usecase/useSuccessAxios';
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';

const useMutateEditAdmins = (closeModal?: () => void, refetch?: () => void) => {
  const { generateErrorMsg, showPopError } = useErrorAxios();
  const { showSuccessMessage } = useSuccessAxios();

  const editRoles = async (payload: IUpdateUserAdminPayload, id: string) => {
    const data = await DashboardUserAPI.editUser(payload, id);
    return data;
  };

  const updateStatus = async (payload: IUpdateUserAdminPayload, id: string) => {
    const data = await DashboardUserAPI.editUser(payload, id);
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
      type,
    }: {
      payload: IUpdateUserAdminPayload;
      id: string;
      type: 'delete' | 'update';
    }) => {
      if (type === 'delete') {
        return updateStatus(payload, id);
      }
      return editRoles(payload, id);
    },
    onError: handleError,
    onSuccess: () => {
      closeModal!();
      refetch!();
      showSuccessMessage('Admin has successfully edited!');
    },
  });

  return { mutate, error, isLoading };
};

export default useMutateEditAdmins;
