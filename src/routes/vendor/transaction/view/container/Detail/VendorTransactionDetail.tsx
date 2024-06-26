import PageTitle from '@/shared/view/presentations/page-title/PageTitle';
import TransactionDetail from '@/shared/view/presentations/transaction/TransactionDetail';
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

function VendorTransactionDetailContainer() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <>
      {/* <ErrorBoundary error={new Error() as AxiosError}> */}
      <PageTitle title="Transaction" />
      <TransactionDetail
        id={id!}
        order_information={{
          order_date: '25/05/24',
          status: 'payment-in-review',
        }}
        buyer_detail={{
          name: 'John Wick',
          email: 'johnwick@gmail.com',
          phone: '0823344229338',
          address: 'Jl. Kalimantan No. 12, Kecamatan Gubeng, Surabaya 60281',
        }}
        vendor_detail={{
          name: 'Infinite Wedding',
          email: 'infinitewedding@gmail.com',
        }}
        product_list={dummyProductList}
        onDeclineClick={() => {}}
        onAdvanceClick={() =>
          navigate(`/vendor-transaction/${id}/advance-progress`)
        }
      />
      {/* </ErrorBoundary> */}
    </>
  );
}

export default VendorTransactionDetailContainer;
