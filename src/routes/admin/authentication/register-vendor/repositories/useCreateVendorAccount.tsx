import useParseVendorDetail from '@/routes/admin/vendor-management/vendor-user-management/repositories/useParseVendorDetail';
import {
  ICreateUserVendorInput,
  ICreateUserVendorPayload,
} from '@/shared/models/userServicesInterface';
import { DashboardUserAPI } from '@/shared/repositories/userServices';
import useErrorAxios from '@/shared/usecase/useErrorAxios';
import useSuccessAxios from '@/shared/usecase/useSuccessAxios';
import { FormInstance } from 'antd';
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import useMutateLogin from './useMutateLogin';

const useRegisterVendorUserAccount = (
  form: FormInstance<any>,
  setCurrentFormValue: React.Dispatch<
    React.SetStateAction<ICreateUserVendorInput | undefined>
  >,
  currentValue: ICreateUserVendorInput | undefined
) => {
  const { mutate: mutateLogin } = useMutateLogin();
  const { generateErrorMsg, showPopError } = useErrorAxios();
  const { showSuccessMessage } = useSuccessAxios();

  const handleFormNext = () => {
    form.validateFields().then((val) => {
      setCurrentFormValue(val);
    });
  };

  const handleSubmit = (value: ICreateUserVendorInput) => {
    mutate(value);
  };

  const createAdmins = async (payload: ICreateUserVendorInput) => {
    const json_text = useParseVendorDetail(payload);

    const newPayload: ICreateUserVendorPayload = {
      name: payload.name,
      email: payload.email,
      password: payload.password,
      profile_image_uri: '',
      type: 'vendor',
      phone_number: payload.phone_number.toString(),
      detail: {
        json_text,
        location: {
          province: {
            value: '',
            label: '',
          },
          city: {
            value: '',
            label: '',
          },
          district: {
            value: '',
            label: '',
          },
          village: {
            value: '',
            label: '',
          },
          postal_code: 0,
        },
        vendor_type_id: 1,
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
      mutateLogin({
        email: currentValue?.email as string,
        password: currentValue?.password as string,
      });
    },
  });
  return {
    mutate,
    error,
    isLoading,
    handleFormNext,
    handleSubmit,
  };
};

export default useRegisterVendorUserAccount;
