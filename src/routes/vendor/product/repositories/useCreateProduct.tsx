import { IVendorLocation } from '@/routes/admin/vendor-management/vendor-user-management/view/container/Create/VendorUserCreate';
import { ICreateProductFormValues } from '@/shared/models/productServicesInterface';
import { DashboardProductAPI } from '@/shared/repositories/productService';
import useMutateCreateAdminNotification from '@/shared/repositories/useCreateAdminNotification';
import useErrorAxios from '@/shared/usecase/useErrorAxios';
import useSuccessAxios from '@/shared/usecase/useSuccessAxios';
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

const useCreateProduct = (
  locationState: IVendorLocation,
  coverageLocation: never[],
  vendorName: string
) => {
  const { generateErrorMsg, showPopError } = useErrorAxios();
  const { showSuccessMessage } = useSuccessAxios();
  const navigate = useNavigate();

  const { mutate: createAdminNotification } =
    useMutateCreateAdminNotification();

  const createProduct = async (payload: ICreateProductFormValues) => {
    const newPayload = {
      ...payload,
      status: 'active',
      tags: payload.tags!.map((dx) => ({ id: dx })),
      location: {
        ...locationState,
        postal_code: payload?.postal_code ?? 0,
      },
      coverage_area: coverageLocation,
    };

    const data = await DashboardProductAPI.createProduct(newPayload);
    return data;
  };

  const handleError = (err: AxiosError) => {
    const msg = generateErrorMsg(err);
    showPopError(msg);
  };

  const { mutate, error, isLoading } = useMutation({
    mutationFn: (payload: ICreateProductFormValues) => {
      return createProduct(payload);
    },
    onError: handleError,
    onSuccess: () => {
      createAdminNotification({
        title: 'New product added!',
        description: `${vendorName} has created a new product`,
      });
      navigate('/vendor-product');
      showSuccessMessage('Product has successfully been created!');
    },
  });

  return {
    mutate,
    error,
    isLoading,
  };
};

export default useCreateProduct;
