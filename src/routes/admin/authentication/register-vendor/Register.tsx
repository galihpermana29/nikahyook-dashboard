import loginImg from '@/assets/login-image.png';
import logo from '@/assets/primary-logo.svg';
import { Button, Form } from 'antd';
import LoadingHandler from '@/shared/view/container/loading/Loading';
import RegistrationFormOne from './view/RegistrationFormOne';
import { useForm } from 'antd/es/form/Form';
import RegistrationFormTwo from './view/RegistrationFormTwo';
import { useState } from 'react';
import { ICreateUserVendorInput } from '@/shared/models/userServicesInterface';
import useRegisterVendorUserAccount from './repositories/useCreateVendorAccount';

const RegisterVendorContainer = () => {
  const [form] = useForm();

  const [currentFormValue, setCurrentFormValue] =
    useState<ICreateUserVendorInput>();

  const { isLoading, handleFormNext, handleSubmit } =
    useRegisterVendorUserAccount(form, setCurrentFormValue, currentFormValue);

  return (
    <div className="h-screen flex">
      <div className="flex-1 h-screen">
        <img
          src={loginImg}
          alt="login-image"
          className="object-cover w-full h-screen"
        />
      </div>
      <div className="flex-1 flex justify-center items-center ">
        <div className="max-w-[550px] w-full">
          <img src={logo} alt="logo" className="w-[280px] m-auto mb-[40px]" />
          <div className="mb-[28px]">
            <h1 className="text-heading-5 font-[600] text-black">Daftar</h1>
            <p className="text-caption-1 text-ny-gray-600 font-[400]">
              Daftar dan masukkan data perusahaanmu. Terhubung dengan client
              dari berbagai lokasi di Indonesia
            </p>
          </div>
          <LoadingHandler isLoading={isLoading} classname="h-[150px]">
            <Form
              form={form}
              layout="vertical"
              onFinish={(val) => handleSubmit({ ...val, ...currentFormValue })}>
              {!currentFormValue ? (
                <RegistrationFormOne />
              ) : (
                <RegistrationFormTwo />
              )}
              {!currentFormValue && (
                <div className="flex gap-[20px]">
                  <a href="/login-vendor" className="inline-block w-full">
                    <Button
                      onClick={handleFormNext}
                      htmlType="button"
                      className="!bg-[#fff] h-[40px] text-black text-body-2 w-full mt-[28px]">
                      Back
                    </Button>
                  </a>
                  <Button
                    onClick={handleFormNext}
                    htmlType="button"
                    className="!bg-[#E60B6A] h-[40px] text-white text-body-2 w-full mt-[28px]">
                    Next
                  </Button>
                </div>
              )}
              <Form.Item className="my-[10px]">
                {currentFormValue && (
                  <Button
                    htmlType="submit"
                    className="!bg-[#E60B6A] h-[40px] text-white text-body-2 w-full mt-[28px]">
                    Register
                  </Button>
                )}
              </Form.Item>
            </Form>
          </LoadingHandler>
        </div>
      </div>
    </div>
  );
};

export default RegisterVendorContainer;
