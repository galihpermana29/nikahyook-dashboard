import declineIcon from '@/assets/icon/decline-icon.svg';
import editIcon from '@/assets/icon/edit-2-white.svg';
import { TTransasactionStatus } from '@/shared/models/transactionServiceInterfaces';
import getTransactionStatusChipColor from '@/shared/usecase/getTransactionStatusChipColor';
import useGenerateTransactionDetailColumn from '@/shared/usecase/useGenerateTransactionDetailColumn';
import { Button, Table, Tag } from 'antd';

interface IOrderInformation {
  order_date: string;
  status: TTransasactionStatus;
}

interface IBuyerDetail {
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface IVendorDetail {
  name: string;
  email: string;
}

interface ITransactionDetail {
  id: string;
  order_information: IOrderInformation;
  buyer_detail: IBuyerDetail;
  vendor_detail: IVendorDetail;
  product_list: any[];
  onDeclineClick: () => void;
  onAdvanceClick: () => void;
}

function TransactionDetail({
  id,
  buyer_detail,
  order_information,
  vendor_detail,
  product_list,
  onDeclineClick,
  onAdvanceClick,
}: ITransactionDetail) {
  const { columns } = useGenerateTransactionDetailColumn();

  return (
    <div className="space-y-5">
      <section className="flex justify-end gap-2">
        <Button
          onClick={onDeclineClick}
          className="border-ny-error-700 text-ny-error-700 flex items-center gap-2">
          <img src={declineIcon} alt="Icon" />
          <span>Decline</span>
        </Button>
        <Button
          onClick={onAdvanceClick}
          type="primary"
          className="flex items-center gap-2">
          <img src={editIcon} alt="Icon" className="h-5 w-5" />
          <span>Advance Progress</span>
        </Button>
      </section>

      <section className="grid grid-cols-3 gap-5">
        <div className="border text-sm p-5">
          <h2 className="text-xl font-medium mb-5">
            Order Information (#{id})
          </h2>

          <div className="space-y-3 divide-y [&>div:not(:first-child)]:pt-4">
            <div className="flex justify-between items-center gap-5">
              <h3 className="text-ny-gray-400">Order date</h3>
              <p className="text-end">{order_information.order_date}</p>
            </div>
            <div className="flex justify-between items-center gap-5">
              <h3 className="text-ny-gray-400">Status</h3>
              <Tag
                className="capitalize m-0"
                color={getTransactionStatusChipColor(order_information.status)}>
                {order_information.status.split('-').join(' ')}
              </Tag>
            </div>
          </div>
        </div>

        <div className="border p-5">
          <h2 className="text-xl mb-5 font-medium">Buyer Details</h2>

          <div className="space-y-3 divide-y [&>div:not(:first-child)]:pt-4">
            <div className="flex justify-between items-center gap-5">
              <h3 className="text-ny-gray-400">Name</h3>
              <p className="text-end">{buyer_detail.name}</p>
            </div>
            <div className="flex justify-between items-center gap-5">
              <h3 className="text-ny-gray-400">Email</h3>
              <p className="text-end">{buyer_detail.email}</p>
            </div>
            <div className="flex justify-between items-center gap-5">
              <h3 className="text-ny-gray-400">Phone</h3>
              <p className="text-end">{buyer_detail.phone}</p>
            </div>
            <div className="flex justify-between items-center gap-5">
              <h3 className="text-ny-gray-400">Address</h3>
              <p className="text-end">{buyer_detail.address}</p>
            </div>
          </div>
        </div>

        <div className="border p-5">
          <h2 className="text-xl font-medium mb-5">
            Vendor Details and Invoice
          </h2>

          <div className="space-y-3 divide-y [&>div:not(:first-child)]:pt-4">
            <div className="flex justify-between items-center gap-5">
              <h3 className="text-ny-gray-400">Name</h3>
              <p className="text-end">{vendor_detail.name}</p>
            </div>
            <div className="flex justify-between items-center gap-5">
              <h3 className="text-ny-gray-400">Email</h3>
              <p className="text-end">{vendor_detail.email}</p>
            </div>
            {(order_information.status === 'waiting-for-payment' ||
              order_information.status === 'waiting-for-approval' ||
              order_information.status === 'order-rejected') && (
              <div className="flex justify-end">
                <Button disabled>Invoice</Button>
              </div>
            )}
            {(order_information.status === 'payment-in-review' ||
              order_information.status === 'payment-done') && (
              <>
                <div className="flex justify-between items-center gap-5">
                  <h3 className="text-ny-gray-400">Invoice</h3>
                  <Button
                    type="primary"
                    disabled={order_information.status !== 'payment-done'}>
                    Detail
                  </Button>
                </div>
                <div className="flex justify-between items-center gap-5">
                  <h3 className="text-ny-gray-400">Detail</h3>
                  <Button type="primary">Detail</Button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-medium mb-5">Product List</h2>
        <Table columns={columns} dataSource={product_list} pagination={false} />
      </section>
    </div>
  );
}

export default TransactionDetail;
