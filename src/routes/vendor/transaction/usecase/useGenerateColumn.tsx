import getTransactionStatusChipColor from '@/shared/usecase/getTransactionStatusChipColor';
import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Row, Space, TableProps, Tag } from 'antd';
import { NavigateFunction } from 'react-router-dom';

function useGenerateColumnVendorTransaction(onNavigate: NavigateFunction) {
  const columns: TableProps['columns'] = [
    {
      title: 'Buyer',
      dataIndex: 'buyer',
      key: 'buyer',
      render: (text) => text,
    },
    {
      title: 'Order Date',
      dataIndex: 'order_date',
      key: 'order_date',
      render: (text) => text,
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
        <Row gutter={[12, 12]}>
          <Dropdown
            menu={{
              items: [
                {
                  label: 'Advance Progress',
                  key: '1',
                  onClick: () => onNavigate(`${id}/advance-progress`),
                },
                {
                  label: 'View Detail',
                  key: '2',
                  onClick: () => onNavigate(`${id}`),
                },
                {
                  label: 'Decline',
                  className: '!text-ny-error-600',
                  key: '3',
                  onClick: () => {},
                },
              ],
            }}>
            <Button className="bg-ny-primary-100 text-caption-1 text-ny-primary-500 hover:!bg-ny-primary-100 hover:!text-ny-primary-500">
              <Space>
                Actions
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </Row>
      ),
    },
  ];

  return { columns };
}

export default useGenerateColumnVendorTransaction;
