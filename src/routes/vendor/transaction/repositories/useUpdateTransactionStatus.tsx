import { IUpdateOrderStatusPayload } from '@/shared/models/transactionServiceInterfaces';
import { DashboardTransactionAPI } from '@/shared/repositories/transactionServices';
import useErrorAxios from '@/shared/usecase/useErrorAxios';
import useSuccessAxios from '@/shared/usecase/useSuccessAxios';
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';

const useMutateUpdateVendorTransaction = () => {
  const { generateErrorMsg, showPopError } = useErrorAxios();
  const { showSuccessMessage } = useSuccessAxios();

  const updateTransactionStatus = async (
    payload: IUpdateOrderStatusPayload,
    id: number
  ) => {
    const data = await DashboardTransactionAPI.updateTransactionStatus(
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
    }: {
      payload: IUpdateOrderStatusPayload;
      id: number;
      onSuccess?: () => void;
    }) => {
      return updateTransactionStatus(payload, id);
    },
    onError: handleError,
    onSuccess: (_, { onSuccess }) => {
      showSuccessMessage('Order status updated successfully!');
      if (onSuccess) onSuccess();
    },
  });
  return { mutate, error, isLoading };
};

export default useMutateUpdateVendorTransaction;
