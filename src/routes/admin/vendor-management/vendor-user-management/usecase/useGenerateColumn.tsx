import {
  IUpdateUserResponseRoot,
  type IUpdateUserVendorInput,
} from '@/shared/models/userServicesInterface';
import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Row, Space, TableProps, Tag } from 'antd';
import { AxiosError } from 'axios';
import { UseMutateFunction } from 'react-query';
import { NavigateFunction } from 'react-router-dom';

const useGenerateColumnVendorUser = (
  remove: boolean,
  edit: boolean,
  view: boolean,
  onNavigate?: NavigateFunction,
  onChangeStatus?: UseMutateFunction<
    IUpdateUserResponseRoot,
    AxiosError<unknown, any>,
    {
      payload: IUpdateUserVendorInput;
      id: string;
      type: 'delete' | 'update';
    },
    unknown
  >
) => {
  const columns: TableProps<any>['columns'] = [
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
                  onClick: () => {
                    onNavigate!(`/vendor-user-management/edit-user/${id}`);
                  },
                  disabled: !edit,
                },
                {
                  label: 'View Detail',
                  key: '2',
                  onClick: () => {
                    onNavigate!(`/vendor-user-management/detail-user/${id}`);
                  },
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

export default useGenerateColumnVendorUser;
