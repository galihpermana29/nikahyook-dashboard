import { AxiosError } from 'axios';
import { 
    Form, 
    FormInstance, 
    Input 
} from 'antd';
import { IResetPasswordResponseRoot } from '@/shared/models/userServicesInterface';
import { UseMutateFunction } from 'react-query';

interface IFormResetPassword {
  form: FormInstance;
  handleMutate?: UseMutateFunction<
    IResetPasswordResponseRoot,
    AxiosError,
    {
      new_password: string;
      id: string;
    },
    unknown
  >;
  footer: React.ReactNode;
  id?: string;
}

const FormResetPassword = ({
  form,
  handleMutate,
  footer,
  id,
}: IFormResetPassword) => {
  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        onFinish={(value) => {
          handleMutate!({ new_password: value.new_password, id: id! });
        }}
      >
        <div className="flex-1">
          <Form.Item
            className="my-[8px]"
            name={'new_password'}
            label="New Password"
            rules={[
              {
                required: true,
                message: 'Please input new password!',
              },
            ]}
          >
            <Input.Password
              placeholder="Enter new password"
              className="h-[40px] rounded-[8px] text-caption-1 font-[400]"
            />
          </Form.Item>
        </div>
        {footer}
      </Form>
    </div>
  );
};

export default FormResetPassword;
