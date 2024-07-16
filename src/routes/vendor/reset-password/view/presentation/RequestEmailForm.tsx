import type {
  IRequestResetEmailPayloadRoot,
  IRequestResetEmailResponseRoot,
} from '@/shared/models/userServicesInterface';
import { Button, Form, Input } from 'antd';
import type { AxiosError } from 'axios';
import type { UseMutateFunction } from 'react-query';

export const RequestEmailForm = ({
  mutate,
}: {
  mutate: UseMutateFunction<
    IRequestResetEmailResponseRoot,
    AxiosError<unknown, any>,
    IRequestResetEmailPayloadRoot,
    unknown
  >;
}) => {
  return (
    <Form onFinish={mutate} layout="vertical">
      <Form.Item
        name={'email'}
        label="Email"
        className="my-[10px]"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
          {
            type: 'email',
            message: 'The input is not valid email',
          },
        ]}>
        <Input placeholder="Enter your email" />
      </Form.Item>
      <div className="mt-[28px] text-right">
        Menuju halaman{' '}
        <a href="/login" className="text-ny-primary-500">
          login
        </a>
      </div>
      <Form.Item className="my-[10px]">
        <Button
          htmlType="submit"
          className="!bg-[#E60B6A] h-[40px] text-white text-body-2 w-full">
          Kirim email
        </Button>
      </Form.Item>
    </Form>
  );
};
