import type {
  ICreateCuratorialResponseRoot,
  ICuratorialPayload,
} from '@/shared/models/curatorialInterfaces';
import DraggerUpload from '@/shared/view/presentations/dragger-upload/DraggerUpload';
import { FormRow } from '@/shared/view/presentations/form-row/FormRow';
import PageHeader from '@/shared/view/presentations/page-header/PageHeader';
import { Button, Empty, Form, FormInstance, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { AxiosError } from 'axios';
import { UseMutateFunction } from 'react-query';
import addIcon from '@/assets/icon/add.png';
import type { TCuratorialModalType } from '../../../usecase/useModalReducer';
import useGetTotalSelectedPrice from '../../../repositories/useGetTotalSelectedPrice';
import SelectedInspirations from '../SelectedInspirations';
import SelectedProducts from '../SelectedProducts';

interface IFormCreation {
  form: FormInstance;
  handleMutate: UseMutateFunction<
    ICreateCuratorialResponseRoot,
    AxiosError<unknown, any>,
    ICuratorialPayload,
    unknown
  >;
  onCancel: () => void;
  openModal?: (
    modalType: TCuratorialModalType,
    id?: string | undefined
  ) => void;
  disabled?: boolean;
}

const FormCreation = ({
  form,
  handleMutate,
  onCancel,
  openModal,
  disabled,
}: IFormCreation) => {
  return (
    <div>
      <Form
        disabled={disabled}
        className="space-y-6"
        form={form}
        layout="vertical"
        onFinish={handleMutate}>
        <PageHeader title="Curatorial Details" onCancel={onCancel} />

        <FormRow
          title="Curatorial Picture"
          description="This will be displayed on curatorial profile">
          <Form.Item
            required
            rules={[
              {
                required: true,
                message: 'Please input curatorial picture!',
              },
            ]}
            name={'expert_photo'}>
            <DraggerUpload form={form} formItemName="expert_photo" />
          </Form.Item>
        </FormRow>

        <FormRow
          title="Basic Details"
          description="Set vendor basic profile details">
          <Form.Item
            required
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
              className="text-caption-1 h-[40px]"
            />
          </Form.Item>

          <Form.Item
            required
            className="my-[8px]"
            name={'expert_name'}
            label="Curator"
            rules={[
              {
                required: true,
                message: "Please input curator's name!",
              },
            ]}>
            <Input
              placeholder="Enter your detail here!"
              className="text-caption-1 h-[40px]"
            />
          </Form.Item>

          <Form.Item
            required
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
          <Form.Item required={false} noStyle name={'images'}>
            <DraggerUpload limit={10} form={form} formItemName="images" />
          </Form.Item>
        </FormRow>

        <FormRow
          title="Inspirations"
          description="Set inspiration photo to your album">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex items-center w-full justify-between">
              <Button
                onClick={() => openModal!('inspiration')}
                className="hover:!bg-ny-primary-500 hover:!text-white h-[40px] bg-ny-primary-500 text-white text-body-2  font-[400] rounded-[8px] flex items-center gap-[8px] cursor-pointer">
                <img src={addIcon} alt="add-icon" />
                Add Inspiration
              </Button>

              <span>
                {form.getFieldValue('inspirations')?.length ?? 0} / 10
              </span>
            </div>
            <Form.Item
              className="m-0 p-0"
              required
              rules={[
                {
                  required: true,
                  message: 'Please input your inspirations!',
                },
              ]}
              name={'inspirations'}>
              <SelectedInspirations
                selectedItemsId={form.getFieldValue('inspirations')}
                emptyComponent={
                  <Empty className="w-full border py-20 rounded-lg" />
                }
              />
            </Form.Item>
          </div>
        </FormRow>

        <FormRow title="Products" description="Set your products">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex items-center w-full justify-between">
              <Button
                onClick={() => openModal!('product')}
                className="hover:!bg-ny-primary-500 hover:!text-white h-[40px] bg-ny-primary-500 text-white text-body-2  font-[400] rounded-[8px] flex items-center gap-[8px] cursor-pointer">
                <img src={addIcon} alt="add-icon" />
                Attach Product
              </Button>

              <Form.Item noStyle name="total_price">
                <span>
                  IDR {useGetTotalSelectedPrice(form.getFieldValue('products'))}
                </span>
              </Form.Item>
            </div>

            <Form.Item
              required
              className="m-0 p-0"
              rules={[
                {
                  required: true,
                  message: 'Please input your products!',
                },
              ]}
              name={'products'}>
              <SelectedProducts
                selectedItemsId={form.getFieldValue('products')}
                emptyComponent={
                  <Empty className="w-full border py-20 rounded-lg" />
                }
              />
            </Form.Item>
          </div>
        </FormRow>
      </Form>
    </div>
  );
};

export default FormCreation;
