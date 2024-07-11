import type {
  IResetPasswordPayloadRoot,
  IResetPasswordResponseRoot,
} from '@/shared/models/userServicesInterface';
import { Button, Form, Input } from 'antd';
import type { AxiosError } from 'axios';
import type { UseMutateFunction } from 'react-query';

export const ResetPasswordForm = ({
  mutate,
}: {
  mutate: UseMutateFunction<
    IResetPasswordResponseRoot,
    AxiosError<unknown, any>,
    IResetPasswordPayloadRoot,
    unknown
  >;
}) => {
  return (
    <Form onFinish={mutate} layout="vertical">
      <Form.Item
        name={'new_password'}
        label="Password baru"
        className="my-[10px]"
        rules={[
          {
            required: true,
            message: 'Masukkan password baru Anda!',
          },
        ]}>
        <Input type="password" placeholder="Masukkan password baru Anda." />
      </Form.Item>
      <Form.Item
        name={'confirm_password'}
        label="Konfirmasi password"
        className="my-[10px]"
        rules={[
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('new_password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Password tidak sama!'));
            },
          }),
        ]}>
        <Input type="password" placeholder="Konfirmasi password baru Anda" />
      </Form.Item>
      <Form.Item className="my-[10px]">
        <Button
          htmlType="submit"
          className="!bg-[#E60B6A] h-[40px] text-white text-body-2 w-full">
          Atur ulang password
        </Button>
      </Form.Item>
    </Form>
  );
};
