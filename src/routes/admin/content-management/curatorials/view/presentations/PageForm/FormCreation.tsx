import type {
  ICreateCuratorialPayloadRoot,
  ICreateCuratorialResponseRoot,
} from '@/shared/models/curatorialInterfaces';
import DraggerUpload from '@/shared/view/presentations/dragger-upload/DraggerUpload';
import { FormRow } from '@/shared/view/presentations/form-row/FormRow';
import PageHeader from '@/shared/view/presentations/page-header/PageHeader';
import { Form, FormInstance, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { AxiosError } from 'axios';
import { UseMutateFunction } from 'react-query';

interface IFormCreation {
  form: FormInstance<any>;
  handleMutate: UseMutateFunction<
    ICreateCuratorialResponseRoot,
    AxiosError<unknown, any>,
    ICreateCuratorialPayloadRoot,
    unknown
  >;
  onCancel: () => void;
}

const FormCreation = ({ form, handleMutate, onCancel }: IFormCreation) => {
  return (
    <div>
      <Form
        className="space-y-6"
        form={form}
        layout="vertical"
        onFinish={handleMutate}>
        <PageHeader title="Curatorial Details" onCancel={onCancel} />

        <FormRow
          title="Curatorial Picture"
          description="This will be displayed on curatorial profile">
          <Form.Item noStyle name={'expert_photo'}>
            <DraggerUpload form={form} formItemName="expert_photo" />
          </Form.Item>
        </FormRow>

        <FormRow
          title="Basic Details"
          description="Set vendor basic profile details">
          <Form.Item
            className="my-[8px]"
            name={'name'}
            label="Curatorial's Name"
            rules={[
              {
                required: true,
                message: "Please input curatorial's name!",
              },
            ]}>
            <Input
              placeholder="Enter your detail here!"
              className="text-caption-1"
            />
          </Form.Item>

          <Form.Item
            className="my-[8px]"
            name={'expert_name'}
            label="Expert Name"
            rules={[
              {
                required: true,
                message: 'Please input expert name!',
              },
            ]}>
            <Input
              placeholder="Enter your detail here!"
              className="text-caption-1"
            />
          </Form.Item>

          <Form.Item
            className="my-[8px]"
            name={'description'}
            label="Curatorial Description"
            rules={[
              {
                required: true,
                message: 'Please input curatorial description!',
              },
            ]}>
            <TextArea
              placeholder="Enter your detail here!"
              className="text-caption-1"
            />
          </Form.Item>
        </FormRow>

        <FormRow
          title="Album"
          description="Set your additional photo to your album">
          <Form.Item noStyle name={'images'}>
            <DraggerUpload form={form} formItemName="images" />
          </Form.Item>
        </FormRow>

        <FormRow
          title="Inspirations"
          description="Set inspiration photo to your album">
          <Form.Item noStyle name={'inspirations_photos'}>
            <DraggerUpload form={form} formItemName="inspirations" />
          </Form.Item>
        </FormRow>

        <FormRow title="Products" description="Set your products">
          <Form.Item noStyle name={'products_photos'}>
            <DraggerUpload form={form} formItemName="products" />
          </Form.Item>
        </FormRow>
      </Form>
    </div>
  );
};

export default FormCreation;
