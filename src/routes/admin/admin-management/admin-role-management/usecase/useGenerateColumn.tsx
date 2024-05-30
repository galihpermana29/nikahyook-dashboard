import {
  IRolePermission,
  IUpdateRolePayloadRoot,
  IUpdateRoleResponseRoot,
} from '@/shared/models/roleServicesInterface';
import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Row, Space, TableProps, Tag } from 'antd';
import { AxiosError } from 'axios';
import { UseMutateFunction } from 'react-query';
import { TModalType } from './useModalReducer';

const useGenerateColumnAdminRole = (
  remove: boolean,
  edit: boolean,
  onOpenModal?: (modalType: TModalType, id?: string | undefined) => void,
  onChangeStatus?: UseMutateFunction<
    IUpdateRoleResponseRoot,
    AxiosError,
    {
      payload: IUpdateRolePayloadRoot;
      id: string;
      type: 'delete' | 'update';
    },
    unknown
  >
) => {
  const columns: TableProps['columns'] = [
    {
      title: 'Role',
      dataIndex: 'name',
      key: 'role',
      render: (text) => {
        return {
          children: <a>{text}</a>,
        };
      },
    },
    {
      title: 'Feature Permission',
      dataIndex: 'permissions',
      key: 'feature_permission',
      render: (permissions: IRolePermission[]) => {
        const tags = permissions.map(
          ({ feature_permission, feature_access }) => {
            const access = feature_access.map((access) =>
              access[0] === 'v' ? 'R' : access[0].toUpperCase()
            );

            const suffix = access.length < 4 ? `: ${access.join('/')}` : '';

            return `${feature_permission}${suffix}`;
          }
        );

        return (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <div className="bg-ny-gray-100 text-ny-gray-600 capitalize px-2 rounded-[4px] border border-ny-gray-300">
                {tag}
              </div>
            ))}
          </div>
        );
      },
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

export default useGenerateColumnAdminRole;
