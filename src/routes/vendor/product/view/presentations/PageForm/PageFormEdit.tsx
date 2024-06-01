import DraggerUpload from '@/shared/view/presentations/dragger-upload/DraggerUpload';
import PageHeader from '@/shared/view/presentations/page-header/PageHeader';
import { Form, FormInstance, Input, InputNumber, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';

interface IPageFormEdit {
  form: FormInstance<any>;
  onSave: any;
  onCancel: any;
  id: string;
  disabled: boolean;
  dynamicSelectOptions: {
    tags: { value: number; label: string }[];
    productTypes: { value: number; label: string }[];
  };
}
const PageFormEdit = ({
  form,
  onSave,
  onCancel,
  id,
  disabled = false,
  dynamicSelectOptions,
}: IPageFormEdit) => {
  return (
    <div>
      <Form
        disabled={disabled}
        form={form}
        layout="vertical"
        className="flex flex-col gap-[20px]"
        onFinish={(val) => onSave({ payload: val, type: 'edit', id })}>
        <PageHeader title="Product Detail" onCancel={onCancel} />
        <div className="flex">
          <div className="w-full max-w-[300px] gap-[20px]">
            <h1 className="text-[#262626] text-body-2">Product Photo</h1>
            <p className="text-[#949494] text-caption-1">
              Product collection of images
            </p>
          </div>
          <div>
            <Form.Item noStyle name={'images'}>
              <DraggerUpload
                limit={3}
                profileImageURL={form.getFieldValue('images')}
                form={form}
                formItemName="images"
              />
            </Form.Item>
          </div>
        </div>
        <div className="flex">
          <div className="w-full max-w-[300px] gap-[20px]">
            <h1 className="text-[#262626] text-body-2">Basic Details</h1>
            <p className="text-[#949494] text-caption-1">
              Product basic details information
            </p>
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
              name={'product_type_id'}
              label="Product Type"
              className="my-[8px]"
              rules={[
                {
                  required: true,
                  message: 'Please select product type',
                },
              ]}>
              <Select
                showSearch
                filterOption={(input, option) =>
                  (option?.label.toLowerCase() ?? '').includes(
                    input.toLowerCase()
                  )
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '')
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? '').toLowerCase())
                }
                className="h-[40px]"
                placeholder="Product Type"
                options={dynamicSelectOptions.productTypes}
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
                showSearch
                filterOption={(input, option) =>
                  (option?.label.toLowerCase() ?? '').includes(
                    input.toLowerCase()
                  )
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '')
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? '').toLowerCase())
                }
                mode="multiple"
                className="min-h-[40px]"
                placeholder="Tag"
                options={dynamicSelectOptions.tags}
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
              <InputNumber<number>
                placeholder="Enter your product price"
                className="h-[40px] rounded-[8px] text-caption-1 font-[400] w-full custom-input"
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
      </Form>
    </div>
  );
};

export default PageFormEdit;
