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

function VendorTransactionAdvanceProgressContainer() {
  const { id } = useParams();

  const navigate = useNavigate();

  const afterPaymentStatuses: TTransasactionStatus[] = [
    'payment done',
    'payment in review',
  ];

  const { mutate, isLoading: mutateLoading } =
    useMutateUpdateVendorTransaction();
  const {
    result: detailData,
    error: detailError,
    isLoading: detailLoading,
    refetch: detailRefetch,
  } = useQueryVendorTransactionDetail(id!);

  if (detailLoading || mutateLoading) return <TransactionLoading />;

  if (!detailData || detailError) throw new Error();

  const { order_details, status, payments_file_uri } =
    detailData.data as unknown as IVendorOrderDetail;

  let calculatedTotal = 0;
  order_details.forEach(({ price }) => {
    calculatedTotal += price;
  });

  const onUploadReceipt = (values) => {
    const receipts = [...payments_file_uri];

    receipts.push(values.receipt);

    mutate({
      id: parseInt(id!),
      payload: { status: status, payment_file_uri: receipts },
    });

    detailRefetch();
  };

  return (
    <ErrorBoundary error={detailError as AxiosError}>
      <PageTitle title="Advance Progress" />

      {afterPaymentStatuses.includes(status) ? (
        <AdvanceAfterPayment
          id={parseInt(id!)}
          payments_file_uri={payments_file_uri}
          status={status}
          mutate={mutate}
          navigate={navigate}
          onUploadReceipt={onUploadReceipt}
        />
      ) : (
        <AdvanceBeforePayment
          id={parseInt(id!)}
          calculatedTotal={calculatedTotal}
          order_details={order_details}
          mutate={mutate}
          navigate={navigate}
        />
      )}
    </ErrorBoundary>
  );
}

export default VendorTransactionAdvanceProgressContainer;
