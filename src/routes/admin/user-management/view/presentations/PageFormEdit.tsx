import DraggerUpload from '@/shared/view/presentations/dragger-upload/DraggerUpload';
import { FormRow } from '@/shared/view/presentations/form-row/FormRow';
import PageHeader from '@/shared/view/presentations/page-header/PageHeader';
import { Button, DatePicker, Form, Input, Radio, Select } from 'antd';
import { FormInstance } from 'antd/es/form/Form';
import { useNavigate } from 'react-router-dom';
import { useGenerateDropdownOptions } from '../../usecase/useGenerateDropdownOptions';
import { Geocoder } from '@mapbox/search-js-react';

interface IFormCreate {
  form: FormInstance;
  onSave: any;
  onCancel: () => void;
  id: string;
  disabled: boolean;
  onChangePasswordClick?: () => void;
  showEditButton?: boolean;
}

export const PageFormEdit = ({
  form,
  onSave,
  onCancel,
  disabled = false,
  showEditButton = false,
  id,
}: IFormCreate) => {
  const navigate = useNavigate();

  const { planOptions, themeOptions, weddingRoleOptions } =
    useGenerateDropdownOptions();

  return (
    <Form
      form={form}
      onFinish={(val) => onSave({ payload: val, type: 'edit', id })}
      layout="vertical"
      disabled={disabled}
      className="flex flex-col gap-5">
      <PageHeader
        title="Profile Details"
        onCancel={onCancel}
        id={id}
        buttonsAfter={
          showEditButton && (
            <Button
              disabled={false}
              onClick={() => navigate(`/user-account/edit-user/${id}`)}
              className="enabled:hover:!bg-ny-primary-500 enabled:hover:!text-white h-[40px] bg-ny-primary-500 text-white text-body-2  font-[400] rounded-[8px] flex items-center gap-[8px] cursor-pointer">
              Edit
            </Button>
          )
        }
      />

      <FormRow
        title="Profile Picture"
        description="This will be displayed on your profile">
        <Form.Item noStyle name={'profile_image_uri'}>
          <DraggerUpload
            form={form}
            formItemName="profile_image_uri"
            profileImageURL={form.getFieldValue('profile_image_uri')}
          />
        </Form.Item>
      </FormRow>

      <FormRow
        title="Basic Details"
        description="Set your basic profile details">
        <Form.Item
          className="my-[8px]"
          name={'email'}
          label="Email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
            {
              type: 'email',
              message: 'The input is not valid email',
            },
          ]}>
          <Input
            disabled
            placeholder="Enter your detail here!"
            className="text-caption-1"
          />
        </Form.Item>
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
            placeholder="Enter your detail here!"
            className="text-caption-1"
          />
        </Form.Item>
        <Form.Item
          className="my-[8px]"
          name={'date_of_birth'}
          label="Date of Birth"
          rules={[
            {
              required: true,
              message: 'Please input your date of birth!',
            },
          ]}>
          <DatePicker
            placeholder="Enter your detail here!"
            className="text-caption-1 w-full"
          />
        </Form.Item>
        <Form.Item
          className="my-[8px]"
          name={'gender'}
          label="Gender"
          rules={[
            {
              required: true,
              message: 'Please input your gender!',
            },
          ]}>
          <Radio.Group
            options={[
              {
                label: 'Male',
                value: 'male',
              },
              {
                label: 'Female',
                value: 'female',
              },
            ]}
            buttonStyle="solid"
          />
        </Form.Item>
      </FormRow>

      <FormRow title="Wedding Details" description="Set wedding details">
        <div className="flex flex-col w-full">
          <Form.Item
            className="my-[8px]"
            name={'wedding_role'}
            label="Wedding Role"
            rules={[
              {
                required: true,
                message: 'Please input wedding role!',
              },
            ]}>
            <Select
              options={weddingRoleOptions}
              placeholder="Enter your detail here!"
              className="text-caption-1"
            />
          </Form.Item>
          <Form.Item
            className="my-[8px]"
            name={'groom_name'}
            label="Groom Name"
            rules={[
              {
                required: true,
                message: 'Please input groom name!',
              },
            ]}>
            <Input
              placeholder="Enter your detail here!"
              className="text-caption-1"
            />
          </Form.Item>
          <Form.Item
            className="my-[8px]"
            name={'bride_name'}
            label="Bride Name"
            rules={[
              {
                required: true,
                message: 'Please input bride name!',
              },
            ]}>
            <Input
              placeholder="Enter your detail here!"
              className="text-caption-1"
            />
          </Form.Item>
          <Form.Item
            className="my-[8px]"
            name={'plan_for'}
            label="Plan For"
            rules={[
              {
                required: true,
                message: 'Please input plan!',
              },
            ]}>
            <Select
              options={planOptions}
              placeholder="Enter your detail here!"
              className="text-caption-1"
            />
          </Form.Item>
          <Form.Item
            className="my-[8px]"
            name={'wedding_theme'}
            label="Wedding Theme"
            rules={[
              {
                required: true,
                message: 'Please input wedding theme!',
              },
            ]}>
            <Select
              options={themeOptions}
              placeholder="Enter your detail here!"
              className="text-caption-1"
            />
          </Form.Item>
          <Form.Item
            className="my-[8px]"
            name={'location'}
            label="Location"
            rules={[
              {
                required: true,
                message: 'Please input location!',
              },
            ]}>
            {disabled ? (
              <Input
                placeholder="Enter your detail here!"
                className="text-caption-1"
              />
            ) : (
              <Geocoder
                placeholder="Enter your detail here!"
                onRetrieve={(res) => {
                  form.setFieldValue('location', res.properties.full_address);
                }}
                accessToken={import.meta.env.VITE_MAPBOX_KEY}
              />
            )}
          </Form.Item>
          <Form.Item
            className="my-[8px]"
            name={'wedding_date'}
            label="Wedding Date"
            rules={[
              {
                required: true,
                message: 'Please input date!',
              },
            ]}>
            <DatePicker
              placeholder="Enter your detail here!"
              className="text-caption-1 w-full"
            />
          </Form.Item>
        </div>
      </FormRow>
    </Form>
  );
};
