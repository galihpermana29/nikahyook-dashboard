/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ICreateNotificationPayload,
  ICreateNotificationResponseRoot,
} from '@/shared/models/notificationServiceInterfaces';
import {
  IUpdateOrderStatusPayload,
  IUpdateOrderStatusResponseRoot,
  TTransasactionStatus,
} from '@/shared/models/transactionServiceInterfaces';
import {
  ICreateUserPayloadRoot,
  IDetailVendorUser,
} from '@/shared/models/userServicesInterface';
import formatDateString from '@/shared/usecase/formatDateString';
import getTransactionStatusChipColor from '@/shared/usecase/getTransactionStatusChipColor';
import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Row, Space, TableProps, Tag } from 'antd';
import { AxiosError } from 'axios';
import { UseMutateFunction } from 'react-query';
import { NavigateFunction } from 'react-router-dom';

function useGenerateColumnVendorTransaction(
  refetch: () => void,
  onNavigate: NavigateFunction,
  onDecline: UseMutateFunction<
    IUpdateOrderStatusResponseRoot,
    AxiosError<unknown, any>,
    {
      payload: IUpdateOrderStatusPayload;
      id: number;
      onSuccess?: () => void;
    },
    unknown
  >,
  onNotify: UseMutateFunction<
    ICreateNotificationResponseRoot,
    AxiosError<unknown, any>,
    ICreateNotificationPayload,
    unknown
  >,
  vendorDetail: ICreateUserPayloadRoot<IDetailVendorUser>
) {
  const disabledAdvanceStatuses: TTransasactionStatus[] = [
    'waiting for payment',
    'payment done',
    'order failed',
  ];
  const disabledDeclineStatuses: TTransasactionStatus[] = [
    'payment done',
    'order failed',
  ];

  const columns: TableProps['columns'] = [
    {
      title: 'Buyer',
      dataIndex: 'buyer',
      key: 'buyer',
      render: ({ name }) => name,
    },
    {
      title: 'Products',
      dataIndex: 'product_names',
      key: 'product_names',
      render: (products) => products.join(', '),
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
      render: ({ id, status, buyer }) => (
        <Row gutter={[12, 12]}>
          <Dropdown
            menu={{
              items: [
                {
                  label: 'Advance Progress',
                  key: '1',
                  onClick: () => onNavigate(`${id}/advance-progress`),
                  disabled: disabledAdvanceStatuses.includes(status),
                },
                {
                  label: 'View Detail',
                  key: '2',
                  onClick: () => onNavigate(`${id}`),
                },
                {
                  label: 'Decline',
                  key: '3',
                  onClick: () =>
                    onDecline({
                      id: id,
                      payload: { status: 'order failed' },
                      onSuccess: () => {
                        refetch();
                        onNotify({
                          title: 'Order declined!',
                          description: `Your order #${id} has been declined by ${vendorDetail.name}`,
                          user_id: buyer.id,
                        });
                      },
                    }),
                  disabled: disabledDeclineStatuses.includes(status),
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
