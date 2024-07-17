import {
  IAdminVendorOrderDetail,
  TTransasactionStatus,
} from '@/shared/models/transactionServiceInterfaces';
import formatDateString from '@/shared/usecase/formatDateString';
import formatToCapitalLetter from '@/shared/usecase/formatToCapitalLetter';
import ErrorBoundary from '@/shared/view/container/error-boundary/ErrorBoundary';
import PageTitle from '@/shared/view/presentations/page-title/PageTitle';
import TransactionDetail from '@/shared/view/presentations/transaction/TransactionDetail';
import TransactionError from '@/shared/view/presentations/transaction/TransactionError';
import TransactionLoading from '@/shared/view/presentations/transaction/TransactionLoading';
import { Button } from 'antd';
import { AxiosError } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import useQueryAdminTransactionDetail from '../../../repositories/useGetDetailTransaction';

function AdminTransactionDetailContainer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const enabledStatus: TTransasactionStatus[] = [
    'payment done',
    'payment in review',
  ];

  const {
    result: detailData,
    error: detailError,
    isLoading: detailLoading,
  } = useQueryAdminTransactionDetail(id!);

  if (detailLoading) return <TransactionLoading />;

  if (!detailData || detailError) return <TransactionError />;

  const { buyer, order_details, order_time, status, vendor } =
    detailData.data as unknown as IAdminVendorOrderDetail;

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
          name: vendor.name,
          email: vendor.email,
        }}
        productList={order_details}
        invoiceComponents={
          <div className="flex justify-end">
            <Button
              type="primary"
              disabled={!enabledStatus.includes(status)}
              onClick={() => navigate(`invoice`)}>
              Invoice
            </Button>
          </div>
        }
      />
    </ErrorBoundary>
  );
}

export default AdminTransactionDetailContainer;
