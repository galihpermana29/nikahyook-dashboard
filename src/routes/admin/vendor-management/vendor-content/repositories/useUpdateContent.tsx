import { ICreateProductFormValues } from '@/shared/models/productServicesInterface';
import { DashboardProductAPI } from '@/shared/repositories/productService';
import useErrorAxios from '@/shared/usecase/useErrorAxios';
import useSuccessAxios from '@/shared/usecase/useSuccessAxios';
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';

const useMutateEditVendorContent = (
  refetch: () => void,
  locationState,
  coverageLocation
) => {
  const { generateErrorMsg, showPopError } = useErrorAxios();
  const { showSuccessMessage } = useSuccessAxios();

  const editContent = async (payload: ICreateProductFormValues, id: string) => {
    const newPayload = {
      ...payload,
      status: 'active',
      tags: payload.tags!.map((dx) => ({ id: dx })),
      location: {
        ...locationState,
        postal_code: payload.postal_code,
      },
      coverage_area: coverageLocation,
    };
    const data = await DashboardProductAPI.editProduct(newPayload, id);
    return data;
  };

  const updateStatus = async (
    payload: ICreateProductFormValues,
    id: string
  ) => {
    const data = await DashboardProductAPI.editProduct(payload, id);
    return data;
  };

  const handleError = (err: AxiosError) => {
    const msg = generateErrorMsg(err);
    showPopError(msg);
  };

  const { mutate, error, isLoading } = useMutation({
    mutationFn: ({
      payload,
      id,
      type,
    }: {
      payload: ICreateProductFormValues;
      id: string;
      type: 'delete' | 'update';
    }) => {
      if (type === 'delete') {
        return updateStatus(payload, id);
      }
      return editContent(payload, id);
    },
    onError: handleError,
    onSuccess: () => {
      refetch!();
      showSuccessMessage('Content has successfully been edited!');
    },
  });

  return {
    mutate,
    error,
    isLoading,
  };
};

export default useMutateEditVendorContent;
