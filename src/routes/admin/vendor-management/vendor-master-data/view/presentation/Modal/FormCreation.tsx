import {
  ICreateProductTagPayloadRoot,
  ICreateProductTagResponseRoot,
  ICreateProductTypePayloadRoot,
  ICreateProductTypeResponseRoot,
} from '@/shared/models/productServicesInterface';
import {
  ICreateVendorTypePayloadRoot,
  ICreateVendorTypeResponseRoot,
} from '@/shared/models/vendorTypeInterface';
import { Form, FormInstance, Input } from 'antd';
import { AxiosError } from 'axios';
import { UseMutateFunction } from 'react-query';

interface IFormCreation {
  form: FormInstance;
  handleMutate: UseMutateFunction<
    | ICreateProductTagResponseRoot
    | ICreateProductTypeResponseRoot
    | ICreateVendorTypeResponseRoot,
    AxiosError,
    | ICreateProductTagPayloadRoot
    | ICreateProductTypePayloadRoot
    | ICreateVendorTypePayloadRoot,
    unknown
  >;
  footer: React.ReactNode;
  type: 'Tag' | 'Product Type' | 'Vendor Type';
}

const FormCreation = ({ form, handleMutate, footer, type }: IFormCreation) => {
  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleMutate}
      >
        <div className="flex gap-[20px]">
          <div className="flex-1">
            <Form.Item
              className="my-[8px]"
              name={'name'}
              label={`${type} name`}
              rules={[
                {
                  required: true,
                  message: `Please input ${type.toLowerCase()} name!`,
                },
              ]}
            >
              <Input
                placeholder={`Enter ${type.toLowerCase()} name`}
                className="h-[40px] rounded-[8px] text-caption-1 font-[400]"
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
