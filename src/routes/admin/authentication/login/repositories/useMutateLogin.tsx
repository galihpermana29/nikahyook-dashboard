import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import useErrorAxios from '@/shared/usecase/useErrorAxios';
import { ILoginPayloadRoot } from '@/shared/models/userServicesInterface';
import { DashboardUserAPI } from '@/shared/repositories/userServices';
import useMutateCreateAdminNotification from '@/shared/repositories/useCreateAdminNotification';

const useMutateLogin = () => {
  const { generateErrorMsg, showPopError } = useErrorAxios();

  const login = async (payload: ILoginPayloadRoot) => {
    const data = await DashboardUserAPI.login(payload);
    return data;
  };

  const handleError = (error: AxiosError) => {
    const msg = generateErrorMsg(error);
    showPopError(msg);
  };

  const { mutate: createAdminNotification } =
    useMutateCreateAdminNotification();

  const { mutate, error, isLoading } = useMutation({
    mutationFn: (payload: ILoginPayloadRoot) =>
      login(payload).then((res) => {
        const { type } = res.data;
        if (type === 'user') {
          // disallow account with type user to login.
          throw new AxiosError('USER_TYPE_NOT_ALLOWED');
        } else {
          return res;
        }
      }),
    onError: handleError,
    onSuccess: (response) => {
      const { token, user_id, email, permissions, type, status } =
        response.data;

      const isFirstTime = localStorage.getItem('is_first_time');

      if (isFirstTime) {
        createAdminNotification({
          title: 'New vendor is here!',
          description: `${email} has registered a new vendor account`,
        });

        localStorage.removeItem('is_first_time');
      }

      localStorage.setItem('token', JSON.stringify(token));
      localStorage.setItem(
        'admin',
        JSON.stringify({ user_id, email, permissions, type, status })
      );

      setTimeout(() => {
        window.location.replace(
          `/home?type=${response.data.type === 'admin' ? 'admin' : 'vendor'}`
        );
      }, 300);
    },
  });
  return { mutate, error, isLoading };
};

export default useMutateLogin;
