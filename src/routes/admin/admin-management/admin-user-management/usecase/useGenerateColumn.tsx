import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Row, Space, TableProps, Tag } from 'antd';
import { TModalType } from '@/shared/usecase/useModalReducer';
import { UseMutateFunction } from 'react-query';
import {
  IUpdateUserPayloadRoot,
  IUpdateUserResponseRoot,
} from '@/shared/models/userServicesInterface';
import { AxiosError } from 'axios';

const useGenerateColumnAdminUser = (
  remove: boolean,
  edit: boolean,
  view: boolean,
  onOpenModal?: (modalType: TModalType, id?: string | undefined) => void,
  onChangeStatus?: UseMutateFunction<
    IUpdateUserResponseRoot,
    AxiosError,
    {
      payload: IUpdateUserPayloadRoot;
      id: string;
      type: 'delete' | 'update';
    },
    unknown
  >
) => {
  const columns: TableProps['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Date of Birth',
      dataIndex: 'date_of_birth',
      key: 'date_of_birth',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Role Name',
      dataIndex: 'role_name',
      key: 'role_name',
      render: (text) => <a className="capitalize">{text}</a>,
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
                  onClick: () => onOpenModal!('edit', id),
                  disabled: !edit,
                },
                {
                  label: 'View Detail',
                  key: '2',
                  onClick: () => onOpenModal!('detail', id),
                  disabled: !view,
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

export default useGenerateColumnAdminUser;
