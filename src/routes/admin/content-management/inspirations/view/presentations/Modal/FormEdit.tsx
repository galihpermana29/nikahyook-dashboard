import useFilterSelectOptions from '@/shared/repositories/useFilterSelectOptions';
import useSortSelectOptions from '@/shared/repositories/useSortSelectOptions';
import DraggerUpload from '@/shared/view/presentations/dragger-upload/DraggerUpload';
import { Form, Input, Select, type FormInstance } from 'antd';

interface IFormEdit {
  form: FormInstance<any>;
  footer: React.ReactNode;
  // handleMutate: UseMutateFunction<
  //   IEditInspirationResponseRoot,
  //   AxiosError<unknown, any>,
  //   IEditInspirationPayloadRoot
  // >;
}

export default function FormEdit({ form, footer }: IFormEdit) {
  return (
    <Form form={form} layout="vertical">
      <div className="flex gap-[20px]">
        <div className="w-full max-w-[187px] flex-1">
          <Form.Item noStyle name={'image'}>
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
              showSearch
              filterOption={useFilterSelectOptions}
              filterSort={useSortSelectOptions}
              mode="multiple"
              className="w-full h-[35px]"
              placeholder="Tag"
              // TODO: change this to query result
              options={[{ label: 'Tes tag', value: 1 }]}
            />
          </Form.Item>
        </div>
      </div>
      {footer}
    </Form>
  );
}
