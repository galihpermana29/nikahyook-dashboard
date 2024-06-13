import { TGeneralSelectOptions } from '@/shared/models/generalInterfaces';
import {
  IUpdateUserAdminPayload,
  IUpdateUserResponseRoot,
} from '@/shared/models/userServicesInterface';

import DraggerUpload from '@/shared/view/presentations/dragger-upload/DraggerUpload';
import { Button, Form, FormInstance, Input, InputNumber, Select } from 'antd';
import { AxiosError } from 'axios';
import { UseMutateFunction } from 'react-query';

interface IFormEdit {
  form: FormInstance;
  handleMutate?: UseMutateFunction<
    IUpdateUserResponseRoot,
    AxiosError,
    {
      payload: IUpdateUserAdminPayload;
      id: string;
      type: 'delete' | 'update';
    },
    unknown
  >;
  footer: React.ReactNode;
  roles: TGeneralSelectOptions[];
  disable: boolean;
  id?: string;
  onChangePasswordClick: () => void;
}
const FormEdit = ({
  form,
  handleMutate,
  footer,
  roles,
  disable,
  id,
  onChangePasswordClick,
}: IFormEdit) => {
  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        onFinish={(value) => {
          handleMutate!({ payload: value, id: id!, type: 'update' });
        }}
        disabled={disable}>
        <div className="flex gap-[20px]">
          <div className="w-full max-w-[187px] flex-1">
            <Form.Item noStyle name={'profile_image_uri'}>
              <DraggerUpload
                profileImageURL={form.getFieldValue('profile_image_uri')}
                form={form}
                formItemName="profile_image_uri"
              />
            </Form.Item>
          </div>

          <div className="flex-1">
            <Form.Item
              className="my-[8px]"
              name={'email'}
              label="Email"
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
                {
                  type: 'email',
                  message: 'The input is not valid email',
                },
              ]}>
              <Input
                placeholder="Enter your detail here"
                className="h-[40px] rounded-[8px] text-caption-1 font-[400]"
              />
            </Form.Item>
            <Form.Item
              className="my-[8px]"
              name={'name'}
              label="Name"
              rules={[
                {
                  required: true,
                  message: 'Please input your fullname!',
                },
              ]}>
              <Input
                placeholder="Enter your detail here"
                className="h-[40px] rounded-[8px] text-caption-1 font-[400]"
              />
            </Form.Item>
            <Form.Item
              className="my-[8px]"
              name={'phone_number'}
              label="Phone Number"
              rules={[
                {
                  required: true,
                  message: 'Please input your phone number!',
                },
              ]}>
              <InputNumber
                placeholder="Enter your detail here"
                className="w-full h-[40px] rounded-[8px] text-caption-1 font-[400] custom-input"
              />
            </Form.Item>
            <Form.Item
              name={['detail', 'role_id']}
              label="Role"
              rules={[
                {
                  required: true,
                  message: 'Please input your role!',
                },
              ]}>
              <Select
                placeholder="Enter your detail here"
                options={roles}
                className="h-[40px] rounded-[8px]"
              />
            </Form.Item>
            <div className="flex justify-end">
              <Button
                type="text"
                disabled={disable}
                onClick={onChangePasswordClick}
                className="text-ny-primary-500">
                Change Password
              </Button>
            </div>
          </div>
        </div>
        {footer}
      </Form>
    </div>
  );
};

export default FormEdit;
