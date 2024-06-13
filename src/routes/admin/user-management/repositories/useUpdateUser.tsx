import {
  ICreateUserPayloadRoot,
  IDetailClientUser,
  IUserClientDetailExtra,
  IUserClientFormValues,
} from '@/shared/models/userServicesInterface';
import { DashboardUserAPI } from '@/shared/repositories/userServices';
import useErrorAxios from '@/shared/usecase/useErrorAxios';
import useSuccessAxios from '@/shared/usecase/useSuccessAxios';
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { IVendorLocation } from '../../vendor-management/vendor-user-management/view/container/Create/VendorUserCreate';
import dayjs from 'dayjs';
import { TGeneralSelectOptions } from '@/shared/models/generalInterfaces';

const useMutateEditClientUser = (
  refetch: () => void,
  locationState: IVendorLocation | null
) => {
  const { generateErrorMsg, showPopError } = useErrorAxios();
  const { showSuccessMessage } = useSuccessAxios();

  const editClientUser = async (payload: IUserClientFormValues, id: string) => {
    const json_text: IUserClientDetailExtra = {
      bride_name: payload.bride_name,
      groom_name: payload.groom_name,
      plan_for: payload.plan_for,
      wedding_role: payload.wedding_role,
      wedding_theme: payload.wedding_theme,
    };

    const location = locationState?.city;

    const newPayload = {
      name: payload.name,
      email: payload.email,
      type: 'user',
      phone_number: payload.phone_number,
      profile_image_uri: payload.profile_image_uri ?? '',
      detail: {
        json_text: JSON.stringify(json_text),
        location: location as TGeneralSelectOptions,
        gender: payload.gender,
        wedding_date: dayjs(payload.wedding_date).format('YYYY-MM-DD'),
        date_of_birth: dayjs(payload.date_of_birth).format('YYYY-MM-DD'),
      },
    };

    const data = await DashboardUserAPI.editUser<IDetailClientUser>(
      newPayload,
      id
    );
    return data;
  };

  const updateStatus = async (
    payload: ICreateUserPayloadRoot<IDetailClientUser>,
    id: string
  ) => {
    const data = await DashboardUserAPI.editUser<IDetailClientUser>(
      payload,
      id
    );
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
      payload: IUserClientFormValues;
      id: string;
      type: 'delete' | 'update';
    }) => {
      if (type === 'delete') {
        return updateStatus(payload as any, id);
      }
      return editClientUser(payload, id);
    },
    onError: handleError,
    onSuccess: () => {
      refetch!();
      showSuccessMessage('User has been successfully edited!');
    },
  });
  return { mutate, error, isLoading };
};

export default useMutateEditClientUser;
