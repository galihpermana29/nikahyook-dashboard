import {
  ICreateUserVendorInput,
  ICreateUserVendorPayload,
} from '@/shared/models/userServicesInterface';
import { DashboardUserAPI } from '@/shared/repositories/userServices';
import useErrorAxios from '@/shared/usecase/useErrorAxios';
import useSuccessAxios from '@/shared/usecase/useSuccessAxios';
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import useParseVendorDetail from './useParseVendorDetail';
import { IVendorLocation } from '../view/container/Create/VendorUserCreate';

const useMutateCreateVendorUser = (vendorLocation: IVendorLocation) => {
  const { generateErrorMsg, showPopError } = useErrorAxios();
  const { showSuccessMessage } = useSuccessAxios();

  const navigate = useNavigate();

  const createAdmins = async (payload: ICreateUserVendorInput) => {
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
          ...vendorLocation,
          postal_code: payload.detail.location.postal_code ?? 0,
        },
        vendor_type_id: payload.detail.vendor_type_id,
      },
    };

    const data = await DashboardUserAPI.createUser(newPayload);
    return data;
  };

  const handleError = (error: AxiosError) => {
    const msg = generateErrorMsg(error);
    showPopError(msg);
  };

  const { mutate, error, isLoading } = useMutation({
    mutationFn: (payload: ICreateUserVendorInput) => createAdmins(payload),
    onError: handleError,
    onSuccess: () => {
      showSuccessMessage('Vendor successfully added!');
      navigate('/vendor-account');
    },
  });
  return { mutate, error, isLoading };
};

export default useMutateCreateVendorUser;
