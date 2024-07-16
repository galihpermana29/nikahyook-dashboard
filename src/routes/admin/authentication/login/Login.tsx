import loginImg from '@/assets/login-image.png';
import logo from '@/assets/primary-logo.svg';
import { Button, Form, Input } from 'antd';
import useMutateLogin from './repositories/useMutateLogin';
import LoadingHandler from '@/shared/view/container/loading/Loading';
import { Link } from 'react-router-dom';

const LoginContainer = () => {
  const { mutate, isLoading } = useMutateLogin();

  return (
    <div className="h-screen flex">
      <div className="flex-1 h-screen hidden md:block">
        <img
          src={loginImg}
          alt="login-image"
          className="object-cover w-full h-screen"
        />
      </div>
      <div className="flex-1 flex justify-center items-center">
        <div className="p-[15px]">
          <img src={logo} alt="logo" className="w-[280px] m-auto mb-[40px]" />
          <div className="mb-[28px]">
            <h1 className="text-heading-5 font-[600] text-black">Masuk</h1>
            <p className="text-caption-1 text-ny-gray-600 font-[400]">
              Silakan masuk menggunakan email dan password yang telah diberikan
            </p>
          </div>
          <LoadingHandler isLoading={isLoading} classname="h-[150px]">
            <Form layout="vertical" onFinish={mutate}>
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
              <div className="relative">
                <Link
                  to="/forgot-password"
                  className="absolute right-0 text-caption-1 text-ny-primary-500 z-[1]">
                  Lupa password?
                </Link>
                <Form.Item
                  name={'password'}
                  label="Password"
                  className="my-[10px]"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your password',
                    },
                  ]}>
                  <Input.Password placeholder="Enter your password" />
                </Form.Item>
              </div>
              <div className="mt-[28px] text-right">
                Daftar sebagai{' '}
                <a href="/register-vendor" className="text-ny-primary-500">
                  Vendor
                </a>
              </div>
              <Form.Item className="my-[10px]">
                <Button
                  htmlType="submit"
                  className="!bg-[#E60B6A] h-[40px] text-white text-body-2 w-full">
                  Masuk
                </Button>
              </Form.Item>
            </Form>
          </LoadingHandler>
        </div>
      </div>
    </div>
  );
};

export default LoginContainer;
