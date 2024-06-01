import {
  IUpdateUserClientInput,
  IUpdateUserResponseRoot,
} from '@/shared/models/userServicesInterface';
import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Row, Space, TableProps, Tag } from 'antd';
import { AxiosError } from 'axios';
import { UseMutateFunction } from 'react-query';
import { NavigateFunction } from 'react-router-dom';
import { useGenerateDropdownOptions } from './useGenerateDropdownOptions';

export const useGenerateColumn = (
  remove: boolean,
  edit: boolean,
  view: boolean,
  onNavigate?: NavigateFunction,
  onChangeStatus?: UseMutateFunction<
    IUpdateUserResponseRoot,
    AxiosError,
    {
      payload: IUpdateUserClientInput;
      id: string;
      type: 'delete' | 'update';
    },
    unknown
  >
) => {
  const { weddingRoleOptions } = useGenerateDropdownOptions();

  const columns: TableProps['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => text,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text) => text,
    },
    {
      title: 'Wedding Role',
      dataIndex: 'detail',
      key: 'wedding_role',
      render: ({ json_text }) => {
        const detailJson = JSON.parse(json_text);

        const role = weddingRoleOptions.filter(
          (opt) => opt.value === detailJson.wedding_role
        );

        return role[0]?.label ?? '-';
      },
    },
    {
      title: 'Gender',
      dataIndex: 'detail',
      key: 'gender',
      render: ({ gender }) => (
        <span className="capitalize">{gender ?? '-'}</span>
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
                  onClick: () => {
                    onNavigate!(`/user-account/edit-user/${id}`);
                  },
                  disabled: edit,
                },
                {
                  label: 'View Detail',
                  key: '2',
                  onClick: () => {
                    onNavigate!(`/user-account/detail-user/${id}`);
                  },
                  disabled: view,
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
