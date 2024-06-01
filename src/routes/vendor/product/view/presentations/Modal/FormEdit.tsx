import {
  IUpdateProductPayloadRoot,
  IUpdateProductResponseRoot,
} from '@/shared/models/productServicesInterface';
import DraggerUpload from '@/shared/view/presentations/dragger-upload/DraggerUpload';
import { Form, FormInstance, Input, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { AxiosError } from 'axios';
import { UseMutateFunction } from 'react-query';

interface IFormEdit {
  form: FormInstance;
  handleMutate?: UseMutateFunction<
    IUpdateProductResponseRoot,
    AxiosError,
    {
      payload: IUpdateProductPayloadRoot;
      id: string;
      type: 'update' | 'delete';
    },
    unknown
  >;
  footer: React.ReactNode;
  disable: boolean;
  id?: string;
}
const FormEdit = ({ form, handleMutate, footer, disable, id }: IFormEdit) => {
  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        onFinish={(value) => {
          handleMutate!({ payload: value, id: id!, type: 'update' });
        }}
        disabled={disable}>
        <div className="flex gap-5">
          <div className="w-full max-w-[187px] flex-1">
            <Form.Item noStyle name={'vendor_image_uri'}>
              <DraggerUpload
                profileImageURL={form.getFieldValue('images')}
                form={form}
                formItemName="vendor_image_uri"
              />
            </Form.Item>
          </div>

          <div className="flex-1">
            <Form.Item
              className="my-[8px]"
              name={'title'}
              label="Product Name"
              rules={[
                {
                  required: true,
                  message: 'Please input your product name',
                },
              ]}>
              <Input
                placeholder="Enter your product name"
                className="h-[40px] rounded-[8px] text-caption-1 font-[400]"
              />
            </Form.Item>
            <Form.Item
              name={'tags'}
              label="Tag"
              className="my-[8px]"
              rules={[
                {
                  required: true,
                  message: 'Please select atleast one tag',
                },
              ]}>
              <Select
                mode="multiple"
                className="min-h-[40px]"
                placeholder="tag"
                options={[
                  { value: 'book', label: 'Book' },
                  { value: 'atomic', label: 'Atomic' },
                  { value: 'habbit', label: 'Habbit' },
                ]}
              />
            </Form.Item>
            <Form.Item
              className="my-[8px]"
              name={'price'}
              label="Price"
              rules={[
                {
                  required: true,
                  message: 'Please input your product price',
                },
              ]}>
              <Input
                placeholder="Enter your product name"
                className="h-[40px] rounded-[8px] text-caption-1 font-[400]"
              />
            </Form.Item>
            <Form.Item
              className="my-[8px]"
              name={'description'}
              label="Description"
              rules={[
                {
                  required: true,
                  message: 'Please input your product description',
                },
              ]}>
              <TextArea
                placeholder="Enter your product description"
                className="!h-[128px] rounded-[8px] text-caption-1 font-[400]"
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
