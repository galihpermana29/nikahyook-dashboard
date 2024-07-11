import {
  IOrderDetail,
  TTransasactionStatus,
} from '@/shared/models/transactionServiceInterfaces';
import getTransactionStatusChipColor from '@/shared/usecase/getTransactionStatusChipColor';
import useGenerateTransactionDetailColumn from '@/shared/usecase/useGenerateTransactionDetailColumn';
import { Table, Tag } from 'antd';
import { ReactNode } from 'react';

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
  orderInformation: IOrderInformation;
  buyerDetail: IBuyerDetail;
  vendorDetail: IVendorDetail;
  productList: IOrderDetail[];
  buttonComponents?: ReactNode;
  invoiceComponents?: ReactNode;
}

function TransactionDetail({
  id,
  buyerDetail,
  orderInformation,
  vendorDetail,
  productList,
  buttonComponents,
  invoiceComponents,
}: ITransactionDetail) {
  const { columns } = useGenerateTransactionDetailColumn();

  return (
    <div className="space-y-5">
      <section className="flex justify-end gap-2">{buttonComponents}</section>

      <section className="grid grid-cols-3 gap-5">
        <div className="border text-sm p-5">
          <h2 className="text-xl font-medium mb-5">
            Order Information (#{id})
          </h2>

          <div className="space-y-3 divide-y [&>div:not(:first-child)]:pt-4">
            <div className="flex justify-between items-center gap-5">
              <h3 className="text-ny-gray-400">Order date</h3>
              <p className="text-end">{orderInformation.order_date}</p>
            </div>
            <div className="flex justify-between items-center gap-5">
              <h3 className="text-ny-gray-400">Status</h3>
              <Tag
                className="capitalize m-0"
                color={getTransactionStatusChipColor(orderInformation.status)}>
                {orderInformation.status.split('-').join(' ')}
              </Tag>
            </div>
          </div>
        </div>

        <div className="border p-5">
          <h2 className="text-xl mb-5 font-medium">Buyer Details</h2>

          <div className="space-y-3 divide-y [&>div:not(:first-child)]:pt-4">
            <div className="flex justify-between items-center gap-5">
              <h3 className="text-ny-gray-400">Name</h3>
              <p className="text-end">{buyerDetail.name}</p>
            </div>
            <div className="flex justify-between items-center gap-5">
              <h3 className="text-ny-gray-400">Email</h3>
              <p className="text-end">{buyerDetail.email}</p>
            </div>
            <div className="flex justify-between items-center gap-5">
              <h3 className="text-ny-gray-400">Phone</h3>
              <p className="text-end">{buyerDetail.phone}</p>
            </div>
            <div className="flex justify-between items-center gap-5">
              <h3 className="text-ny-gray-400">Address</h3>
              <p className="text-end">{buyerDetail.address}</p>
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
              <p className="text-end">{vendorDetail.name}</p>
            </div>
            <div className="flex justify-between items-center gap-5">
              <h3 className="text-ny-gray-400">Email</h3>
              <p className="text-end">{vendorDetail.email}</p>
            </div>
            {invoiceComponents}
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-medium mb-5">Product List</h2>
        <Table columns={columns} dataSource={productList} pagination={false} />
      </section>
    </div>
  );
}

export default TransactionDetail;
