import {
  IUpdateProductTagPayloadRoot,
  IUpdateProductTagResponseRoot,
  IUpdateProductTypePayloadRoot,
  IUpdateProductTypeResponseRoot,
} from '@/shared/models/productServicesInterface';
import {
  IUpdateVendorTypePayloadRoot,
  IUpdateVendorTypeResponseRoot,
} from '@/shared/models/vendorTypeInterface';
import { Form, FormInstance, Input } from 'antd';
import { AxiosError } from 'axios';
import { UseMutateFunction } from 'react-query';

interface IFormEdit {
  form: FormInstance;
  handleMutate: UseMutateFunction<
    | IUpdateProductTagResponseRoot
    | IUpdateProductTypeResponseRoot
    | IUpdateVendorTypeResponseRoot,
    AxiosError,
    {
      payload:
        | IUpdateProductTagPayloadRoot
        | IUpdateProductTypePayloadRoot
        | IUpdateVendorTypePayloadRoot;
      id: string;
      type: 'delete' | 'update';
    },
    unknown
  >;
  type: 'Tag' | 'Product Type' | 'Vendor Type';
  footer: React.ReactNode;
  disable: boolean;
  id?: string;
}
const FormEdit = ({ form, handleMutate, footer, id, type }: IFormEdit) => {
  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        onFinish={(value) => {
          handleMutate!({
            payload: value,
            id: id!,
            type: 'update',
          });
        }}
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

export default FormEdit;
