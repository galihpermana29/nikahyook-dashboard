import { TTransasactionStatus } from '@/shared/models/transactionServiceInterfaces';
import PageTitle from '@/shared/view/presentations/page-title/PageTitle';
import TransactionDetail from '@/shared/view/presentations/transaction/TransactionDetail';
import { Button } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

//* will be deleted on integration
const dummyProductList = [
  {
    name: 'Luxury Ballroom',
    description: undefined,
    qty: 1,
    price: 50000,
  },
];

function AdminTransactionDetailContainer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const enabledStatus: TTransasactionStatus[] = [
    'payment-done',
    'payment-in-review',
  ];

  return (
    <>
      {/* <ErrorBoundary error={new Error() as AxiosError}> */}
      <PageTitle title="Transaction" />
      <TransactionDetail
        id={id!}
        orderInformation={{
          order_date: '25/05/24',
          status: 'payment-done',
        }}
        buyerDetail={{
          name: 'John Wick',
          email: 'johnwick@gmail.com',
          phone: '0823344229338',
          address: 'Jl. Kalimantan No. 12, Kecamatan Gubeng, Surabaya 60281',
        }}
        vendorDetail={{
          name: 'Infinite Wedding',
          email: 'infinitewedding@gmail.com',
        }}
        productList={dummyProductList}
        invoiceComponents={
          <div className="flex justify-end">
            <Button
              type="primary"
              disabled={!enabledStatus.includes('payment-done')}
              onClick={() => navigate(`invoice`)}>
              Invoice
            </Button>
          </div>
        }
      />
      {/* </ErrorBoundary> */}
    </>
  );
}

export default AdminTransactionDetailContainer;
