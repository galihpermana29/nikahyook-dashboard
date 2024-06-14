import DraggerUpload from '@/shared/view/presentations/dragger-upload/DraggerUpload';
import { FormRow } from '@/shared/view/presentations/form-row/FormRow';
import PageHeader from '@/shared/view/presentations/page-header/PageHeader';
import { Button, Form, Input, InputNumber, Select } from 'antd';
import { FormInstance } from 'antd/es/form/Form';
import TextArea from 'antd/es/input/TextArea';
import { useNavigate } from 'react-router-dom';
import useFilterVendorTypes from '../../../repositories/useFilterVendorTypes';
import useSortSelectOptions from '@/shared/repositories/useSortSelectOptions';
import { TGeneralSelectOptions } from '@/shared/models/generalInterfaces';
import { IVendorLocation } from '../../container/Create/VendorUserCreate';

import fb from '@/assets/icon/fb.png';
import tiktok from '@/assets/icon/tiktok.png';
import ig from '@/assets/icon/ig.png';
import website from '@/assets/icon/website.png';

interface IFormCreate {
  form: FormInstance;
  onSave: any;
  onCancel: () => void;
  id: string;
  disabled: boolean;
  onChangePasswordClick?: () => void;
  showEditButton?: boolean;
  dynamicSelectOptions: {
    vendorTypes: TGeneralSelectOptions[];
    provinceTypes: TGeneralSelectOptions[];
    cityTypes: TGeneralSelectOptions[];
    districtTypes: TGeneralSelectOptions[];
    villageTypes: TGeneralSelectOptions[];
  };
  onLocationChange: React.Dispatch<React.SetStateAction<IVendorLocation>>;
}

export const PageFormEdit = ({
  form,
  onSave,
  onCancel,
  disabled = false,
  showEditButton = false,
  id,
  onChangePasswordClick,
  dynamicSelectOptions,
  onLocationChange,
}: IFormCreate) => {
  const navigate = useNavigate();

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
        buttonsBefore={
          <Button
            onClick={onChangePasswordClick}
            type="text"
            className="text-ny-primary-500">
            Change Password
          </Button>
        }
        buttonsAfter={
          showEditButton && (
            <Button
              disabled={false}
              onClick={() => navigate(`/vendor-account/edit-user/${id}`)}
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
            className="text-caption-1 h-[40px]"
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
            className="text-caption-1 h-[40px]"
          />
        </Form.Item>
        <Form.Item
          className="my-[8px]"
          name={'phone_number'}
          label="Phone Number"
          rules={[
            {
              required: true,
              message: 'Please input your phone number!',
            },
          ]}>
          <InputNumber
            placeholder="Enter your detail here"
            className="w-full rounded-[8px] text-caption-1 font-[400] h-[40px] custom-input"
          />
        </Form.Item>
      </FormRow>

      <FormRow
        title="Additional Details"
        description="Set your additional details to your profile">
        <div className="flex flex-col w-full">
          <Form.Item
            className="my-[8px]"
            name={'vendor_description'}
            label="Vendor Description"
            rules={[
              {
                required: true,
                message: 'Please input vendor description!',
              },
            ]}>
            <TextArea
              placeholder="Enter a description ..."
              className="text-caption-1"
              style={{ height: 120, resize: 'none' }}
            />
          </Form.Item>
          <div className="flex w-full gap-2">
            <Form.Item
              className="my-[8px] w-full"
              name={['detail', 'vendor_type_id']}
              label="Vendor Type"
              rules={[
                {
                  required: true,
                  message: 'Please select vendor type!',
                },
              ]}>
              <Select
                showSearch
                optionFilterProp="children"
                filterOption={useFilterVendorTypes}
                filterSort={useSortSelectOptions}
                options={dynamicSelectOptions.vendorTypes}
                placeholder="Enter your detail here!"
                className="text-caption-1 h-[40px]"
              />
            </Form.Item>
          </div>
          <div className="flex w-full gap-2">
            <Form.Item
              rules={[
                {
                  required: true,
                  message: 'Please select province!',
                },
              ]}
              className="my-[8px] w-full"
              name={['detail', 'location', 'province']}
              label="Province">
              <Select
                onChange={(_, opt: any) =>
                  onLocationChange((dx) => ({ ...dx, province: opt }))
                }
                showSearch
                optionFilterProp="children"
                filterOption={useFilterVendorTypes}
                filterSort={useSortSelectOptions}
                options={dynamicSelectOptions.provinceTypes}
                placeholder="Enter your detail here!"
                className="text-caption-1 h-[40px]"
              />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: 'Please select city!',
                },
              ]}
              className="my-[8px] w-full"
              name={['detail', 'location', 'city']}
              label="City">
              <Select
                onChange={(_, opt: any) =>
                  onLocationChange((dx) => ({ ...dx, city: opt }))
                }
                showSearch
                optionFilterProp="children"
                filterOption={useFilterVendorTypes}
                filterSort={useSortSelectOptions}
                options={dynamicSelectOptions.cityTypes}
                placeholder="Enter your detail here!"
                className="text-caption-1 h-[40px]"
              />
            </Form.Item>
          </div>
          <div className="flex w-full gap-2">
            <Form.Item
              rules={[
                {
                  required: true,
                  message: 'Please select district!',
                },
              ]}
              className="my-[8px] w-full"
              name={['detail', 'location', 'district']}
              label="District">
              <Select
                onChange={(_, opt: any) =>
                  onLocationChange((dx) => ({ ...dx, district: opt }))
                }
                showSearch
                optionFilterProp="children"
                filterOption={useFilterVendorTypes}
                filterSort={useSortSelectOptions}
                options={dynamicSelectOptions.districtTypes}
                placeholder="Enter your detail here!"
                className="text-caption-1 h-[40px]"
              />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: 'Please select village!',
                },
              ]}
              className="my-[8px] w-full"
              name={['detail', 'location', 'village']}
              label="Village">
              <Select
                onChange={(_, opt: any) =>
                  onLocationChange((dx) => ({ ...dx, village: opt }))
                }
                showSearch
                optionFilterProp="children"
                filterOption={useFilterVendorTypes}
                filterSort={useSortSelectOptions}
                options={dynamicSelectOptions.villageTypes}
                placeholder="Enter your detail here!"
                className="text-caption-1 h-[40px]"
              />
            </Form.Item>
          </div>
          <Form.Item
            rules={[
              {
                required: true,
                message: 'Please select postal code!',
              },
            ]}
            className="my-[8px]"
            name={['detail', 'location', 'postal_code']}
            label="Postal Code">
            <InputNumber
              placeholder="Enter your detail here"
              className="w-full rounded-[8px] text-caption-1 font-[400] custom-input h-[40px] "
            />
          </Form.Item>
        </div>
      </FormRow>
      <FormRow
        title="Social Media"
        description="Let them know your social media, so they can connect with you">
        <Form.Item className="my-[8px]" name={'website'} label="Website">
          <Input
            addonBefore={<img src={website} alt="website" />}
            placeholder="https://website.com"
            className="text-caption-1 h-[40px]"
          />
        </Form.Item>
        <Form.Item className="my-[8px]" name={'tiktok'} label="Tiktok">
          <Input
            addonBefore={<img src={tiktok} alt="website" />}
            placeholder="https://www.tiktok.com/@test"
            className="text-caption-1 h-[40px]"
          />
        </Form.Item>
        <Form.Item className="my-[8px]" name={'instagram'} label="Instagram">
          <Input
            addonBefore={<img src={ig} alt="website" />}
            placeholder="https://www.instagram.com/@test"
            className="text-caption-1 h-[40px]"
          />
        </Form.Item>
        <Form.Item className="my-[8px]" name={'facebook'} label="Facebook">
          <Input
            addonBefore={<img src={fb} alt="website" />}
            placeholder="https://www.facebook.com/@test"
            className="text-caption-1 h-[40px]"
          />
        </Form.Item>
      </FormRow>
      <FormRow
        title="Album"
        description="Set your additional photo to your album">
        <Form.Item noStyle name={'vendor_album'}>
          <DraggerUpload
            form={form}
            formItemName="vendor_album"
            limit={10}
            profileImageURL={form.getFieldValue('vendor_album')}
          />
        </Form.Item>
      </FormRow>
    </Form>
  );
};
