import type { TGeneralSelectOptions } from '@/shared/models/generalInterfaces';
import type {
  ICreateInspirationInputRoot,
  ICreateInspirationResponseRoot,
} from '@/shared/models/inspirationInterfaces';
import useFilterSelectOptions from '@/shared/repositories/useFilterSelectOptions';
import useSortSelectOptions from '@/shared/repositories/useSortSelectOptions';
import DraggerUpload from '@/shared/view/presentations/dragger-upload/DraggerUpload';
import { Form, Input, Select, type FormInstance } from 'antd';
import type { AxiosError } from 'axios';
import type { UseMutateFunction } from 'react-query';

interface IFormCreation {
  form: FormInstance<any>;
  footer: React.ReactNode;
  tags?: TGeneralSelectOptions[];
  handleMutate: UseMutateFunction<
    ICreateInspirationResponseRoot,
    AxiosError<unknown, any>,
    ICreateInspirationInputRoot
  >;
}

export default function FormCreation({
  form,
  footer,
  tags,
  handleMutate,
}: IFormCreation) {
  return (
    <Form form={form} layout="vertical" onFinish={handleMutate}>
      <div className="flex flex-col sm:flex-row gap-[10px] sm:gap-[20px]">
        <div className="w-full sm:max-w-[187px] flex-1">
          <Form.Item
            className="my-[8px]"
            name={'image'}
            rules={[
              {
                required: true,
                message: 'Please input the image!',
              },
            ]}>
            <DraggerUpload
              profileImageURL={form.getFieldValue('image')}
              form={form}
              formItemName="image"
            />
          </Form.Item>
        </div>

        <div className="flex-1">
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
              placeholder="Enter your detail here"
              className="h-[40px] rounded-[8px] text-caption-1 font-[400]"
            />
          </Form.Item>
          <Form.Item
            className="my-[8px]"
            name={'tags'}
            label="Tags"
            rules={[
              {
                required: true,
                message: 'Please include your inspiration tags!',
              },
            ]}>
            <Select
              mode="multiple"
              showSearch
              filterOption={useFilterSelectOptions}
              filterSort={useSortSelectOptions}
              className="w-full min-h-[40px]"
              placeholder="Tag"
              options={tags}
            />
          </Form.Item>
        </div>
      </div>
      {footer}
    </Form>
  );
}
