import { Form, Input, InputNumber } from 'antd';
import TextArea from 'antd/es/input/TextArea';

const RegistrationFormOne = () => {
  return (
    <div>
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
          className="text-caption-1 h-[40px]"
        />
      </Form.Item>
      <Form.Item
        className="my-[8px]"
        name={'name'}
        label="Business Name"
        rules={[
          {
            required: true,
            message: 'Please input your name!',
          },
        ]}>
        <Input
          placeholder="Enter your detail here!"
          className="text-caption-1 h-[40px]"
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
          placeholder="Enter your detail here!"
          className="text-caption-1 h-[40px] "
        />
      </Form.Item>
      <Form.Item
        className="my-[8px]"
        name={'password_confirmation'}
        label="Re-enter Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The password does not match!'));
            },
          }),
        ]}>
        <Input.Password
          placeholder="Enter your detail here!"
          className="text-caption-1 h-[40px]"
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
          className="w-full rounded-[8px] text-caption-1 font-[400] h-[40px] custom-input"
        />
      </Form.Item>

      <Form.Item
        className="my-[8px]"
        name={'vendor_description'}
        label="Vendor Description"
        rules={[
          {
            required: true,
            message: 'Please input vendor description!',
          },
        ]}>
        <TextArea
          placeholder="Enter a description ..."
          className="text-caption-1"
          style={{ height: 50, resize: 'none' }}
        />
      </Form.Item>
    </div>
  );
};

export default RegistrationFormOne;
