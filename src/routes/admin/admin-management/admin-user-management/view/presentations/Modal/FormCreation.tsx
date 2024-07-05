import { TGeneralSelectOptions } from '@/shared/models/generalInterfaces';
import {
  ICreateUserPayloadRoot,
  ICreateUserResponseRoot,
  IDetailAdminUser,
} from '@/shared/models/userServicesInterface';
import DraggerUpload from '@/shared/view/presentations/dragger-upload/DraggerUpload';
import { Form, FormInstance, Input, InputNumber, Select } from 'antd';
import { AxiosError } from 'axios';
import { UseMutateFunction } from 'react-query';

interface IFormCreation {
  form: FormInstance<any>;
  handleMutate: UseMutateFunction<
    ICreateUserResponseRoot,
    AxiosError<unknown, any>,
    ICreateUserPayloadRoot<IDetailAdminUser>,
    unknown
  >;
  footer: React.ReactNode;
  roles: TGeneralSelectOptions[];
}
const FormCreation = ({ form, handleMutate, footer, roles }: IFormCreation) => {
  return (
    <div>
      <Form form={form} layout="vertical" onFinish={handleMutate}>
        <div className="flex flex-col sm:flex-row items-center gap-[20px]">
          <div className="w-full sm:max-w-[187px] flex-1">
            <Form.Item noStyle name={'profile_image_uri'}>
              <DraggerUpload
                profileImageURL={form.getFieldValue('profile_image_uri')}
                form={form}
                formItemName="profile_image_uri"
              />
            </Form.Item>
          </div>

          <div className="w-full sm:w-fit flex-1">
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
              name={'password'}
              label="Password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}>
              <Input.Password
                placeholder="Enter your detail here"
                className="h-[40px] rounded-[8px] text-caption-1 font-[400] "
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
          </div>
        </div>
        {footer}
      </Form>
    </div>
  );
};

export default FormCreation;
