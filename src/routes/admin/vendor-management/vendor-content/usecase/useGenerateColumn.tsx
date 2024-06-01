import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Row, Space, TableProps, Tag } from 'antd';
import { UseMutateFunction } from 'react-query';
import { AxiosError } from 'axios';
import {
  IUpdateProductPayloadRoot,
  IUpdateProductResponseRoot,
} from '@/shared/models/productServicesInterface';
import { NavigateFunction } from 'react-router-dom';

const useGenerateColumnVendorProduct = (
  onNavigate?: NavigateFunction,
  onChangeStatus?: UseMutateFunction<
    IUpdateProductResponseRoot,
    AxiosError,
    {
      payload: IUpdateProductPayloadRoot;
      id: string;
      type: 'update' | 'delete';
    },
    unknown
  >
) => {
  const columns: TableProps<any>['columns'] = [
    {
      title: 'Product',
      dataIndex: 'title',
      key: 'title',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text) => (
        <a>
          {text?.toLocaleString('id-ID', {
            style: 'currency',
            currency: 'IDR',
          })}
        </a>
      ),
    },
    {
      title: 'Vendor',
      dataIndex: 'vendor_name',
      key: 'vendor_name',
      render: (text) => <a className="capitalize">{text}</a>,
    },
    {
      title: 'Tag',
      dataIndex: 'tags',
      key: 'tags',
      render: (tags) => (
        <div>
          {tags.map((data, idx) => (
            <Tag className="capitalize" key={idx}>
              {data?.name}
            </Tag>
          ))}
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text: string) => (
        <Tag className="capitalize" color={text === 'active' ? 'green' : 'red'}>
          {text}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      dataIndex: '',
      key: 'actions',
      render: ({ id, status }) => (
        <Row gutter={[12, 12]}>
          <Dropdown
            menu={{
              items: [
                {
                  label: 'Edit',
                  key: '1',
                  onClick: () =>
                    onNavigate!(`/vendor-product/edit-product/${id}`),
                },
                {
                  label: 'View Detail',
                  key: '2',
                  onClick: () =>
                    onNavigate!(`/vendor-product/detail-product/${id}`),
                },
                {
                  label: status === 'active' ? 'Deactivate' : 'Activate',
                  key: '3',
                  onClick: () =>
                    onChangeStatus!({
                      payload: {
                        status: status === 'active' ? 'inactive' : 'active',
                      },
                      id,
                      type: 'delete',
                    }),
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
};

export default useGenerateColumnVendorProduct;
