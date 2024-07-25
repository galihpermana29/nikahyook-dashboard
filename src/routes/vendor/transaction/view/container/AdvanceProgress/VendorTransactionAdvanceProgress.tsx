import {
  IVendorOrderDetail,
  TTransasactionStatus,
} from '@/shared/models/transactionServiceInterfaces';
import ErrorBoundary from '@/shared/view/container/error-boundary/ErrorBoundary';
import PageTitle from '@/shared/view/presentations/page-title/PageTitle';
import TransactionLoading from '@/shared/view/presentations/transaction/TransactionLoading';
import { AxiosError } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import useQueryVendorTransactionDetail from '../../../repositories/useGetDetailTransaction';
import useMutateUpdateVendorTransaction from '../../../repositories/useUpdateTransactionStatus';
import AdvanceAfterPayment from '../../presentation/AdvanceAfterPayment';
import AdvanceBeforePayment from '../../presentation/AdvanceBeforePayment';
import TransactionError from '@/shared/view/presentations/transaction/TransactionError';
import useMutateCreateNotification from '@/shared/repositories/useCreateNotification';
import useClientSession from '@/shared/usecase/useClientSession';
import useQueryDetailUser from '@/shared/view/container/general-layout/repositories/useQueryDetailUser';

function VendorTransactionAdvanceProgressContainer() {
  const { id } = useParams();

  const navigate = useNavigate();
  const session = useClientSession();

  const afterPaymentStatuses: TTransasactionStatus[] = [
    'payment done',
    'payment in review',
  ];

  const { mutate: mutateTransaction, isLoading: mutateLoading } =
    useMutateUpdateVendorTransaction();
  const { mutate: mutateNotification } = useMutateCreateNotification();

  const {
    data: userData,
    isLoading: userLoading,
    error: userDataError,
  } = useQueryDetailUser(session?.user_id ?? '');

  const {
    result: detailData,
    error: detailError,
    isLoading: detailLoading,
    refetch: detailRefetch,
  } = useQueryVendorTransactionDetail(id!);

  if (detailLoading || mutateLoading || userLoading)
    return <TransactionLoading />;

  if (!detailData || detailError || userDataError) return <TransactionError />;

  const { order_details, status, payments_file_uri, buyer } =
    detailData.data as unknown as IVendorOrderDetail;

  let calculatedTotal = 0;
  order_details.forEach(({ price }) => {
    calculatedTotal += price;
  });

  const onUploadReceipt = (values) => {
    const receipts = [...payments_file_uri];

    receipts.push(values.receipt);

    mutateTransaction({
      id: parseInt(id!),
      payload: { status: status, payment_file_uri: receipts },
      onSuccess: () => detailRefetch(),
    });
  };

  return (
    <ErrorBoundary error={detailError as AxiosError}>
      <PageTitle title="Advance Progress" />

      {afterPaymentStatuses.includes(status) ? (
        <AdvanceAfterPayment
          id={parseInt(id!)}
          buyer_id={buyer.id}
          vendor_name={userData?.name ?? ''}
          payments_file_uri={payments_file_uri}
          status={status}
          mutate={mutateTransaction}
          navigate={navigate}
          onUploadReceipt={onUploadReceipt}
          onNotify={mutateNotification}
        />
      ) : (
        <AdvanceBeforePayment
          id={parseInt(id!)}
          buyer_id={buyer.id}
          vendor_name={userData?.name ?? ''}
          calculatedTotal={calculatedTotal}
          order_details={order_details}
          mutate={mutateTransaction}
          navigate={navigate}
          onNotify={mutateNotification}
        />
      )}
    </ErrorBoundary>
  );
}

export default VendorTransactionAdvanceProgressContainer;
