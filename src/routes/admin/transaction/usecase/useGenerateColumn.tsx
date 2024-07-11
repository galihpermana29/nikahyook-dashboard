import getTransactionStatusChipColor from '@/shared/usecase/getTransactionStatusChipColor';
import { Button, Space, TableProps, Tag } from 'antd';
import { NavigateFunction } from 'react-router-dom';
import FolderIcon from '@/assets/icon/folder-icon.svg';
import formatDateString from '@/shared/usecase/formatDateString';

function useGenerateColumnAdminTransaction(onNavigate: NavigateFunction) {
  const columns: TableProps['columns'] = [
    {
      title: 'Buyer',
      dataIndex: 'buyer',
      key: 'buyer',
      render: (buyer) => buyer.name,
    },
    {
      title: 'Vendor',
      dataIndex: 'vendor',
      key: 'vendor',
      render: (vendor) => vendor.name,
    },
    {
      title: 'Order Date',
      dataIndex: 'order_time',
      key: 'order_time',
      render: (text) => formatDateString(text),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text) => (
        <Tag className="capitalize" color={getTransactionStatusChipColor(text)}>
          {text.split('-').join(' ')}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      dataIndex: '',
      key: 'actions',
      render: ({ id }) => (
        <Button
          // type="primary"
          onClick={() => onNavigate(`/admin-transaction/${id}`)}
          className="bg-ny-primary-100 text-caption-1 text-ny-primary-500 hover:!bg-ny-primary-100 hover:!text-ny-primary-500">
          <Space>
            <img src={FolderIcon} alt="icon" />
            <span>View Detail</span>
          </Space>
        </Button>
      ),
    },
  ];

  return { columns };
}

export default useGenerateColumnAdminTransaction;
