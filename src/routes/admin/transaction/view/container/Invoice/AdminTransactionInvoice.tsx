import PageTitle from '@/shared/view/presentations/page-title/PageTitle';
import { Button, Space } from 'antd';
import DownloadIcon from '@/assets/icon/download-icon.svg';

function AdminTransactionInvoiceContainer() {
  return (
    <>
      {/* <ErrorBoundary> */}
      <PageTitle title="Invoice" />
      {/* </ErrorBoundary> */}

      <section>
        <div className="flex justify-end">
          <Button type="primary" className="pt-2 h-fit">
            <Space>
              <img src={DownloadIcon} alt="icon" />
              <span>Download as PDF</span>
            </Space>
          </Button>
        </div>
      </section>
    </>
  );
}

export default AdminTransactionInvoiceContainer;
