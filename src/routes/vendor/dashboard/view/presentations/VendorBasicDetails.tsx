import { Form, Input, InputNumber } from 'antd';
import { FormRow } from '@/shared/view/presentations/form-row/FormRow';

export default function VendorBasicDetails() {
  return (
    <FormRow title="Basic Details" description="Set your basic profile details">
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
          placeholder="Enter your detail here!"
          className="text-caption-1"
        />
      </Form.Item>
      <Form.Item
        className="my-[8px]"
        name={'name'}
        label="Name"
        rules={[
          {
            required: true,
            message: 'Please input your name!',
          },
        ]}>
        <Input
          placeholder="Enter your detail here!"
          className="text-caption-1"
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
          className="w-full rounded-[8px] text-caption-1 font-[400] "
        />
      </Form.Item>
    </FormRow>
  );
}
