import {
  ICreateUserVendorInput,
  ICreateUserVendorPayload,
} from '@/shared/models/userServicesInterface';
import { DashboardUserAPI } from '@/shared/repositories/userServices';
import useErrorAxios from '@/shared/usecase/useErrorAxios';
import useSuccessAxios from '@/shared/usecase/useSuccessAxios';
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import useParseVendorDetail from './useParseVendorDetail';
import { IVendorLocation } from '../view/container/Create/VendorUserCreate';

const useMutateEditVendorUser = (
  refetch: () => void,
  vendorLocation?: IVendorLocation
) => {
  const { generateErrorMsg, showPopError } = useErrorAxios();
  const { showSuccessMessage } = useSuccessAxios();

  const editVendorUser = async (
    payload: ICreateUserVendorInput,
    id: string
  ) => {
    const json_text = useParseVendorDetail(payload);

    const newPayload: ICreateUserVendorPayload = {
      name: payload.name,
      email: payload.email,
      password: payload.password,
      profile_image_uri: payload.profile_image_uri ?? '',
      type: 'vendor',
      phone_number: payload.phone_number.toString(),
      detail: {
        json_text,
        location: {
          ...vendorLocation!,
          postal_code: payload.detail.location.postal_code ?? 0,
        },
        vendor_type_id: payload.detail.vendor_type_id,
      },
    };
    const data = await DashboardUserAPI.editUser(newPayload, id);
    return data;
  };

  const updateStatus = async (payload: ICreateUserVendorInput, id: string) => {
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
      payload: ICreateUserVendorInput;
      id: string;
      type: 'delete' | 'update';
      onSuccess?: () => void;
    }) => {
      if (type === 'delete') {
        return updateStatus(payload, id);
      }
      return editVendorUser(payload, id);
    },
    onError: handleError,
    onSuccess: (_, { onSuccess }) => {
      refetch!();
      showSuccessMessage('Vendor has been successfully edited!');
      if (onSuccess) onSuccess();
    },
  });
  return { mutate, error, isLoading };
};

export default useMutateEditVendorUser;
