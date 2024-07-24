import useErrorAxios from '@/shared/usecase/useErrorAxios';
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { ICreateAdminNotificationPayload } from '../models/notificationServiceInterfaces';
import { DashboardNotificationAPI } from './notificationServices';

const useMutateCreateAdminNotification = () => {
  const { generateErrorMsg, showPopError } = useErrorAxios();

  const createAdminNotification = async (
    payload: ICreateAdminNotificationPayload
  ) => {
    const data = await DashboardNotificationAPI.createAdminNotification(
      payload
    );
    return data;
  };

  const handleError = (error: AxiosError) => {
    const msg = generateErrorMsg(error);
    showPopError(msg);
  };

  const { mutate, error, isLoading } = useMutation({
    mutationFn: (payload: ICreateAdminNotificationPayload) =>
      createAdminNotification(payload),
    onError: handleError,
  });
  return { mutate, error, isLoading };
};

export default useMutateCreateAdminNotification;
