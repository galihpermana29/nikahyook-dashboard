import DownloadIcon from '@/assets/icon/download-icon.svg';
import PageTitle from '@/shared/view/presentations/page-title/PageTitle';
import { Button, Space } from 'antd';
import InvoicePDF from '../../presentation/InvoicePDF';

//* will be deleted on integration
const dummyProductList = [
  {
    id: 1,
    name: 'Luxury Ballroom',
    description:
      'Our luxury ballroom, with elegant decor and state-of-the-art amenities, comfortably accommodates up to 100 guests, creating an intimate yet grand setting for your unforgettable celebration.',
    qty: 1,
    price: 5000000,
  },
  {
    id: 2,
    name: 'Party Bus',
    description:
      'Experience luxury and excitement on our 20-passenger party bus, equipped with plush seating, state-of-the-art sound and lighting systems, and ample space for unforgettable celebrations.',
    qty: 1,
    price: 1500000,
  },
];

function AdminTransactionInvoiceContainer() {
  const prices = dummyProductList.map((product) => product.price);
  const grandTotal = prices.reduce((sum, next) => sum + next, 0);

  return (
    <>
      {/* <ErrorBoundary> */}
      <PageTitle title="Invoice" />
      <section>
        <div className="flex justify-end mb-5">
          <Button type="primary" className="pt-2 h-fit">
            <Space>
              <img src={DownloadIcon} alt="icon" />
              <span>Download as PDF</span>
            </Space>
          </Button>
        </div>
        <InvoicePDF
          submittedOn="01/01/24"
          invoiceNo="151515"
          customer="John Wick"
          date="25/05/24"
          vendor="Lovely Lights"
          productList={dummyProductList}
          grandTotal={grandTotal}
        />
      </section>
      {/* </ErrorBoundary> */}
    </>
  );
}

export default AdminTransactionInvoiceContainer;
