import { AxiosError } from 'axios';
import { Button, Dropdown, Row, Space, TableProps, Tag } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import {
  IUpdateProductTypePayloadRoot,
  IUpdateProductTypeResponseRoot,
} from '@/shared/models/productServicesInterface';
import { TModalType } from './useModalReducer';
import { UseMutateFunction } from 'react-query';

export const useGenerateProductTypeColumn = (
  remove: boolean,
  edit: boolean,
  onOpenModal?: (modalType: TModalType, id?: string | undefined) => void,
  onChangeStatus?: UseMutateFunction<
    IUpdateProductTypeResponseRoot,
    AxiosError,
    {
      payload: IUpdateProductTypePayloadRoot;
      id: string;
      type: 'delete' | 'update';
    },
    unknown
  >
) => {
  const columns: TableProps['columns'] = [
    {
      title: 'Product Type',
      key: 'type_name',
      dataIndex: 'name',
      render: (text) => <a>{text}</a>,
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
      render: ({ status, id }) => (
        <Row gutter={[12, 12]}>
          <Dropdown
            menu={{
              items: [
                {
                  label: 'Edit',
                  key: '1',
                  onClick: () => onOpenModal!('edit', id),
                  disabled: !edit,
                },
                {
                  label: status === 'active' ? 'Deactivate' : 'Activate',
                  key: '2',
                  onClick: () =>
                    onChangeStatus!({
                      payload: {
                        status: status === 'active' ? 'inactive' : 'active',
                      },
                      id,
                      type: 'delete',
                    }),
                  disabled: !remove,
                },
              ],
            }}
          >
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
