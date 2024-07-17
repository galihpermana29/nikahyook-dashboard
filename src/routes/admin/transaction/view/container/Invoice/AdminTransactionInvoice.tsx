import DownloadIcon from '@/assets/icon/download-icon.svg';
import { IAdminVendorOrderDetail } from '@/shared/models/transactionServiceInterfaces';
import ErrorBoundary from '@/shared/view/container/error-boundary/ErrorBoundary';
import PageTitle from '@/shared/view/presentations/page-title/PageTitle';
import TransactionError from '@/shared/view/presentations/transaction/TransactionError';
import TransactionLoading from '@/shared/view/presentations/transaction/TransactionLoading';
import { Button, Space } from 'antd';
import { AxiosError } from 'axios';
import { Document, Page, pdfjs } from 'react-pdf';
import { useParams } from 'react-router-dom';
import useQueryAdminTransactionDetail from '../../../repositories/useGetDetailTransaction';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

function AdminTransactionInvoiceContainer() {
  const { id } = useParams();

  const {
    result: detailData,
    error: detailError,
    isLoading: detailLoading,
  } = useQueryAdminTransactionDetail(id!);

  if (detailLoading) return <TransactionLoading />;

  if (!detailData || detailError) return <TransactionError />;

  const { invoice_file_uri } =
    detailData.data as unknown as IAdminVendorOrderDetail;

  return (
    <ErrorBoundary error={detailError as AxiosError}>
      <PageTitle title="Invoice" />
      <section>
        <div className="flex justify-end mb-5">
          <Button
            href={invoice_file_uri}
            target="_blank"
            type="primary"
            className="pt-2 h-fit">
            <Space>
              <img src={DownloadIcon} alt="icon" />
              <span>Download as PDF</span>
            </Space>
          </Button>
        </div>

        <Document
          file={invoice_file_uri}
          className={'max-h-screen overflow-hidden'}>
          <Page width={800} pageNumber={1} />
        </Document>
      </section>
    </ErrorBoundary>
  );
}

export default AdminTransactionInvoiceContainer;
