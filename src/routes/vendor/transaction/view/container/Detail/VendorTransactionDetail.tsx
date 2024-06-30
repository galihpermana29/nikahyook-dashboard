import declineIcon from '@/assets/icon/decline-icon.svg';
import editIcon from '@/assets/icon/edit-2-white.svg';
import { TTransasactionStatus } from '@/shared/models/transactionServiceInterfaces';
import PageTitle from '@/shared/view/presentations/page-title/PageTitle';
import TransactionDetail from '@/shared/view/presentations/transaction/TransactionDetail';
import { Button, Space } from 'antd';
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
        buttonComponents={
          <>
            <Button
              onClick={() => navigate(`advance-progress`)}
              className="border-ny-error-700 text-ny-error-700 h-fit pt-2">
              <Space>
                <img src={declineIcon} alt="Icon" />
                <span>Decline</span>
              </Space>
            </Button>
            <Button
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
        }
        invoiceComponents={
          !enabledStatus.includes('payment-done') ? (
            <div className="flex justify-end">
              <Button disabled>Invoice</Button>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center gap-5">
                <h3 className="text-ny-gray-400">Invoice</h3>
                <Button type="primary" disabled={false}>
                  Detail
                </Button>
              </div>
              <div className="flex justify-between items-center gap-5">
                <h3 className="text-ny-gray-400">Detail</h3>
                <Button type="primary">Detail</Button>
              </div>
            </>
          )
        }
      />
      {/* </ErrorBoundary> */}
    </>
  );
}

export default VendorTransactionDetailContainer;
