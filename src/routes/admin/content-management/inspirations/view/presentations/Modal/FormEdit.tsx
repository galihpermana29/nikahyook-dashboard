import type { TGeneralSelectOptions } from '@/shared/models/generalInterfaces';
import type {
  IEditInspirationInputRoot,
  IEditInspirationResponseRoot,
} from '@/shared/models/inspirationInterfaces';
import useFilterSelectOptions from '@/shared/repositories/useFilterSelectOptions';
import useSortSelectOptions from '@/shared/repositories/useSortSelectOptions';
import LoadingHandler from '@/shared/view/container/loading/Loading';
import DraggerUpload from '@/shared/view/presentations/dragger-upload/DraggerUpload';
import { Form, Input, Select, type FormInstance } from 'antd';
import type { AxiosError } from 'axios';
import type { UseMutateFunction } from 'react-query';

interface IFormEdit {
  id?: string;
  tags?: TGeneralSelectOptions[];
  form: FormInstance<any>;
  footer: React.ReactNode;
  isLoading: boolean;
  handleMutate: UseMutateFunction<
    IEditInspirationResponseRoot,
    AxiosError<unknown, any>,
    IEditInspirationInputRoot
  >;
}

export default function FormEdit({
  tags,
  form,
  footer,
  isLoading,
  handleMutate,
}: IFormEdit) {
  return (
    <LoadingHandler classname="h-80" isLoading={isLoading}>
      <Form form={form} onFinish={handleMutate} layout="vertical">
        <div className="flex gap-[20px]">
          <div className="w-full max-w-[187px] flex-1">
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
              name={'tags'}
              rules={[
                {
                  required: true,
                  message: 'Please include your inspiration tags!',
                },
              ]}
              label="Tags"
              className="my-2">
              <Select
                showSearch
                filterOption={useFilterSelectOptions}
                filterSort={useSortSelectOptions}
                mode="multiple"
                className="w-full min-h-[40px]"
                placeholder="Tag"
                options={tags}
              />
            </Form.Item>
          </div>
        </div>
        {footer}
      </Form>
    </LoadingHandler>
  );
}
