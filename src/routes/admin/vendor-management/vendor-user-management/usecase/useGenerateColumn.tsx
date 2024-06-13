import {
  ICreateUserVendorInput,
  IUpdateUserResponseRoot,
} from '@/shared/models/userServicesInterface';
import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space, TableProps, Tag } from 'antd';
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
      payload: ICreateUserVendorInput;
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
      title: 'Phone Number',
      dataIndex: 'phone_number',
      key: 'phone_number',
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
      align: 'center',
      render: ({ id, status }) => (
        <div className="flex gap-[5px] justify-center">
          {status === 'pending' && (
            <>
              <Button
                onClick={() => {
                  onChangeStatus!({
                    payload: {
                      status: 'inactive',
                    } as unknown as ICreateUserVendorInput,
                    id,
                    type: 'delete',
                  });
                }}
                htmlType="button"
                className="border-ny-primary-500 text-ny-primary-500">
                Reject
              </Button>
              <Button
                onClick={() => {
                  onChangeStatus!({
                    payload: {
                      status: 'active',
                    } as unknown as ICreateUserVendorInput,
                    id,
                    type: 'delete',
                  });
                }}
                htmlType="button"
                className="hover:!bg-ny-primary-500 hover:!text-white bg-ny-primary-500 text-white cursor-pointer">
                Approve
              </Button>
            </>
          )}
          <Dropdown
            menu={{
              items: [
                {
                  label: 'Edit',
                  key: '1',
                  onClick: () => {
                    onNavigate!(`/vendor-account/edit-user/${id}`);
                  },
                  disabled: !edit,
                },
                {
                  label: 'View Detail',
                  key: '2',
                  onClick: () => {
                    onNavigate!(`/vendor-account/detail-user/${id}`);
                  },
                  disabled: !view,
                },
                status !== 'pending'
                  ? {
                      label: status === 'active' ? 'Deactivate' : 'Activate',
                      key: '3',
                      onClick: () =>
                        onChangeStatus!({
                          payload: {
                            status: status === 'active' ? 'inactive' : 'active',
                          } as unknown as ICreateUserVendorInput,
                          id,
                          type: 'delete',
                        }),
                      disabled: !remove,
                    }
                  : null,
              ],
            }}>
            <Button className="bg-ny-primary-100 text-caption-1 text-ny-primary-500 hover:!bg-ny-primary-100 hover:!text-ny-primary-500">
              <Space>
                Actions
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </div>
      ),
    },
  ];

  return { columns };
};

export default useGenerateColumnVendorUser;
