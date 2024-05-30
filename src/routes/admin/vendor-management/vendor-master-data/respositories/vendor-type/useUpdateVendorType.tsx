import { AxiosError } from 'axios';
import { DashboardVendorTypeAPI } from '@/shared/repositories/vendorTypeService';
import { IUpdateVendorTypePayloadRoot } from '@/shared/models/vendorTypeInterface';
import { useMutation } from 'react-query';
import useErrorAxios from '@/shared/usecase/useErrorAxios';
import useSuccessAxios from '@/shared/usecase/useSuccessAxios';

const useMutateEditVendorType = (
  closeModal?: () => void,
  refetch?: () => void
) => {
  const { generateErrorMsg, showPopError } = useErrorAxios();
  const { showSuccessMessage } = useSuccessAxios();

  const editProductTag = async (
    payload: IUpdateVendorTypePayloadRoot,
    id: string
  ) => {
    const data = await DashboardVendorTypeAPI.editVendorType(payload, id);
    return data;
  };

  const updateStatus = async (
    payload: IUpdateVendorTypePayloadRoot,
    id: string
  ) => {
    const data = await DashboardVendorTypeAPI.editVendorType(payload, id);
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
      payload: IUpdateVendorTypePayloadRoot;
      id: string;
      type: 'delete' | 'update';
    }) => {
      if (type === 'delete') {
        return updateStatus(payload, id);
      }
      return editProductTag(payload, id);
    },
    onError: handleError,
    onSuccess: () => {
      closeModal!();
      refetch!();
      showSuccessMessage('Vendor Type has been successfully edited!');
    },
  });

  return {
    mutate,
    error,
    isLoading,
  };
};

export default useMutateEditVendorType;
