import declineIcon from '@/assets/icon/decline-icon.svg';
import editIcon from '@/assets/icon/edit-2-white.svg';
import {
  IVendorOrderDetail,
  TTransasactionStatus,
} from '@/shared/models/transactionServiceInterfaces';
import formatDateString from '@/shared/usecase/formatDateString';
import useClientSession from '@/shared/usecase/useClientSession';
import ErrorBoundary from '@/shared/view/container/error-boundary/ErrorBoundary';
import useQueryDetailUser from '@/shared/view/container/general-layout/repositories/useQueryDetailUser';
import PageTitle from '@/shared/view/presentations/page-title/PageTitle';
import TransactionDetail from '@/shared/view/presentations/transaction/TransactionDetail';
import TransactionError from '@/shared/view/presentations/transaction/TransactionError';
import TransactionLoading from '@/shared/view/presentations/transaction/TransactionLoading';
import { Button, Space } from 'antd';
import { AxiosError } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import useQueryVendorTransactionDetail from '../../../repositories/useGetDetailTransaction';
import useMutateUpdateVendorTransaction from '../../../repositories/useUpdateTransactionStatus';
import formatToCapitalLetter from '@/shared/usecase/formatToCapitalLetter';
import useMutateCreateNotification from '@/shared/repositories/useCreateNotification';

function VendorTransactionDetailContainer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const session = useClientSession();

  const enabledStatus: TTransasactionStatus[] = [
    'payment done',
    'payment in review',
  ];

  const disabledAdvanceStatuses: TTransasactionStatus[] = [
    'payment done',
    'order failed',
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

  if (detailLoading || userLoading || mutateLoading)
    return <TransactionLoading />;

  if (!detailData || detailError || userDataError) return <TransactionError />;

  const { buyer, order_details, order_time, status, invoice_file_uri } =
    detailData.data as unknown as IVendorOrderDetail;

  return (
    <ErrorBoundary error={detailError as AxiosError}>
      <PageTitle title="Transaction" />
      <TransactionDetail
        id={id!}
        orderInformation={{
          order_date: formatDateString(order_time),
          status: status,
        }}
        buyerDetail={{
          name: buyer.name,
          email: buyer.email,
          phone: buyer.phone_number,
          address: formatToCapitalLetter(JSON.parse(buyer.location).Label),
        }}
        vendorDetail={{
          name: userData?.name ?? '-',
          email: userData?.email ?? '-',
        }}
        productList={order_details}
        buttonComponents={
          !disabledAdvanceStatuses.includes(status) && (
            <>
              <Button
                onClick={() =>
                  mutateTransaction({
                    id: parseInt(id!),
                    payload: { status: 'order failed' },
                    onSuccess: () => {
                      detailRefetch();
                      mutateNotification({
                        title: 'Order declined!',
                        description: `Your order #${id} has been declined by ${userData?.name}`,
                        user_id: buyer.id,
                      });
                    },
                  })
                }
                className="border-ny-error-700 text-ny-error-700 h-fit pt-2">
                <Space>
                  <img src={declineIcon} alt="Icon" />
                  <span>Decline</span>
                </Space>
              </Button>
              <Button
                disabled={status === 'waiting for payment'}
                onClick={() =>
                  navigate(`/vendor-transaction/${id}/advance-progress`)
                }
                type="primary"
                className="h-fit pt-2">
                <Space>
                  <img src={editIcon} alt="Icon" className="h-5 w-5" />
                  <span>Advance Progress</span>
                </Space>
              </Button>
            </>
          )
        }
        invoiceComponents={
          !enabledStatus.includes(status) ? (
            <div className="flex justify-end">
              <Button disabled>Invoice</Button>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center gap-5">
                <h3 className="text-ny-gray-400">Invoice</h3>
                <Button
                  type="primary"
                  href={invoice_file_uri}
                  target="_blank"
                  disabled={status === 'payment in review'}>
                  Detail
                </Button>
              </div>
              <div className="flex justify-between items-center gap-5">
                <h3 className="text-ny-gray-400">Detail</h3>
                <Button
                  type="primary"
                  onClick={() =>
                    navigate(`/vendor-transaction/${id}/advance-progress`)
                  }>
                  Detail
                </Button>
              </div>
            </>
          )
        }
      />
    </ErrorBoundary>
  );
}

export default VendorTransactionDetailContainer;
