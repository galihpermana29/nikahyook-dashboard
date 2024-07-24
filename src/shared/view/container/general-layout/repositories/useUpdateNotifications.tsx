import { DashboardNotificationAPI } from '@/shared/repositories/notificationServices';
import useErrorAxios from '@/shared/usecase/useErrorAxios';
import useSuccessAxios from '@/shared/usecase/useSuccessAxios';
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';

const useMutateUpdateNotifications = (refetch: () => void) => {
  const { generateErrorMsg, showPopError } = useErrorAxios();
  const { showSuccessMessage } = useSuccessAxios();

  const updateNotificationsStatus = async () => {
    const data = await DashboardNotificationAPI.readAllNotifications();
    return data;
  };

  const handleError = (error: AxiosError) => {
    const msg = generateErrorMsg(error);
    showPopError(msg);
  };

  const { mutate, error, isLoading } = useMutation({
    mutationFn: () => {
      return updateNotificationsStatus();
    },
    onError: handleError,
    onSuccess: () => {
      refetch();
      showSuccessMessage('All notifications has been read!');
    },
  });
  return { mutate, error, isLoading };
};

export default useMutateUpdateNotifications;
