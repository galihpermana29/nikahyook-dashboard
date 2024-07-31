import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Row, Space, TableProps, Tag } from 'antd';
import { UseMutateFunction } from 'react-query';
import { AxiosError } from 'axios';
import type {
  ICuratorialPayload,
  IDetailCuratorialData,
  IUpdateCuratorialResponseRoot,
} from '@/shared/models/curatorialInterfaces';
import type { NavigateFunction } from 'react-router-dom';

const useGenerateColumnCuratorials = (
  remove: boolean,
  edit: boolean,
  view: boolean,
  onNavigate: NavigateFunction,
  onChangeStatus: UseMutateFunction<
    IUpdateCuratorialResponseRoot,
    AxiosError,
    {
      payload: ICuratorialPayload;
      id: number;
    },
    unknown
  >
) => {
  const columns: TableProps<IDetailCuratorialData>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: IDetailCuratorialData['name']) => <span>{text}</span>,
    },
    {
      title: 'Curator',
      dataIndex: 'expert_name',
      key: 'expert_name',
      render: (text: IDetailCuratorialData['expert_name']) => (
        <span>{text}</span>
      ),
    },
    {
      title: 'Product',
      dataIndex: 'products',
      key: 'products',
      render: (products: IDetailCuratorialData['products']) =>
        products ? (
          <div className="flex w-full items-center flex-wrap">
            {products.map((product) => (
              <Tag>{product.title}</Tag>
            ))}
          </div>
        ) : (
          <span>No products</span>
        ),
    },
    {
      title: 'Vendor Name',
      dataIndex: 'vendor',
      key: 'vendor_name',
      render: (vendors: IDetailCuratorialData['vendor']) =>
        vendors ? (
          <div className="flex w-full items-center flex-wrap">
            {vendors.map((vendor) => (
              <Tag>{vendor.name}</Tag>
            ))}
          </div>
        ) : (
          <Tag>No vendors</Tag>
        ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text: IDetailCuratorialData['status']) => (
        <Tag className="capitalize" color={text === 'active' ? 'green' : 'red'}>
          {text}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      dataIndex: '',
      key: 'actions',
      render: ({ id, status, ...payload }) => (
        <Row gutter={[12, 12]}>
          <Dropdown
            menu={{
              items: [
                {
                  label: 'Edit',
                  key: '1',
                  onClick: () =>
                    onNavigate!(`/curatorial/edit-curatorial/${id}`),
                  disabled: !edit,
                },
                {
                  label: 'View Detail',
                  key: '2',
                  onClick: () =>
                    onNavigate!(`/curatorial/detail-curatorial/${id}`),
                  disabled: !view,
                },
                {
                  label: status === 'active' ? 'Deactivate' : 'Activate',
                  key: '3',
                  onClick: () =>
                    onChangeStatus!({
                      payload: {
                        ...payload,
                        products:
                          payload.products && payload.products.length > 0
                            ? payload.products.map(({ id }) => id)
                            : [],
                        inspirations:
                          payload.inspirations &&
                          payload.inspirations.length > 0
                            ? payload.inspirations.map(({ id }) => id)
                            : [],
                        status: status === 'active' ? 'inactive' : 'active',
                      },
                      id,
                    }),
                  disabled: !remove,
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

export default useGenerateColumnCuratorials;
