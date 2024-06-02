import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Row, Space, TableProps, Tag } from 'antd';
import { UseMutateFunction } from 'react-query';
import { AxiosError } from 'axios';
import type {
  IDetailCuratorialData,
  IUpdateCuratorialPayloadRoot,
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
      payload: IUpdateCuratorialPayloadRoot;
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
      dataIndex: 'product',
      key: 'product',
      render: (products: IDetailCuratorialData['products']) =>
        products ? (
          products.map((product) => (
            <span className="last:mr-0 mr-1">{product.title}</span>
          ))
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
          vendors.map((vendor) => (
            <span className="last:mr-0 mr-1">{vendor.name}</span>
          ))
        ) : (
          <span>No vendors</span>
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
                  onClick: () => onNavigate!(`/curatorial/edit-user/${id}`),
                  disabled: !edit,
                },
                {
                  label: 'View Detail',
                  key: '2',
                  onClick: () => onNavigate!(`/curatorial/edit-user/${id}`),
                  disabled: !view,
                },
                {
                  label: status === 'active' ? 'Deactivate' : 'Activate',
                  key: '3',
                  onClick: () =>
                    onChangeStatus!({
                      payload: {
                        ...payload,
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
