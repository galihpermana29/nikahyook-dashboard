import useErrorAxios from '@/shared/usecase/useErrorAxios';
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { ICreateNotificationPayload } from '../models/notificationServiceInterfaces';
import { DashboardNotificationAPI } from './notificationServices';

const useMutateCreateNotification = () => {
  const { generateErrorMsg, showPopError } = useErrorAxios();

  const createAdminNotification = async (
    payload: ICreateNotificationPayload
  ) => {
    const data = await DashboardNotificationAPI.createNotification(payload);
    return data;
  };

  const handleError = (error: AxiosError) => {
    const msg = generateErrorMsg(error);
    showPopError(msg);
  };

  const { mutate, error, isLoading } = useMutation({
    mutationFn: (payload: ICreateNotificationPayload) =>
      createAdminNotification(payload),
    onError: handleError,
  });
  return { mutate, error, isLoading };
};

export default useMutateCreateNotification;
