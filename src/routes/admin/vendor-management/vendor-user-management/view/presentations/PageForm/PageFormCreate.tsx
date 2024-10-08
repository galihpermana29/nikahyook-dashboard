import DraggerUpload from '@/shared/view/presentations/dragger-upload/DraggerUpload';
import { Form, Input, InputNumber, Select } from 'antd';
import { FormInstance } from 'antd/es/form/Form';
import PageHeader from '@/shared/view/presentations/page-header/PageHeader';
import { FormRow } from '@/shared/view/presentations/form-row/FormRow';
import TextArea from 'antd/es/input/TextArea';
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
  onCancel: any;
  dynamicSelectOptions: {
    vendorTypes: TGeneralSelectOptions[];
    provinceTypes: TGeneralSelectOptions[];
    cityTypes: TGeneralSelectOptions[];
    districtTypes: TGeneralSelectOptions[];
    villageTypes: TGeneralSelectOptions[];
  };
  onLocationChange: React.Dispatch<React.SetStateAction<IVendorLocation>>;
}

export const PageFormCreate = ({
  form,
  onSave,
  onCancel,
  dynamicSelectOptions,
  onLocationChange,
}: IFormCreate) => {
  return (
    <Form
      form={form}
      onFinish={(val) => onSave(val)}
      layout="vertical"
      className="flex flex-col gap-5">
      <PageHeader title="Profile Details" onCancel={onCancel} />

      <FormRow
        title="Profile Picture"
        description="This will be displayed on your profile">
        <Form.Item noStyle name={'profile_image_uri'}>
          <DraggerUpload form={form} formItemName="profile_image_uri" />
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
          name={'password'}
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}>
          <Input.Password
            placeholder="Enter your detail here!"
            className="text-caption-1 h-[40px]"
          />
        </Form.Item>
        <Form.Item
          className="my-[8px]"
          name={'password_confirmation'}
          label="Re-enter Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('The password does not match!')
                );
              },
            }),
          ]}>
          <Input.Password
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
            className="w-full rounded-[8px] text-caption-1 font-[400] h-[40px]"
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
          <div className="flex flex-col sm:flex-row w-full gap-0 sm:gap-2">
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
          <div className="flex flex-col sm:flex-row w-full gap-0 sm:gap-2">
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
            className="my-[8px]"
            name={['detail', 'location', 'postal_code']}
            label="Postal Code">
            <InputNumber
              min={0}
              placeholder="Enter your detail here"
              className="w-full rounded-[8px] text-caption-1 font-[400] h-[40px] custom-input"
            />
          </Form.Item>
        </div>
      </FormRow>
      <FormRow
        title="Social Media"
        description="Let them know your social media, so they can connect with you">
        <Form.Item className="my-[8px]" name={'website'} label="Website">
          <Input
            prefix={<img src={website} alt="website" />}
            placeholder="https://website.com"
            className="text-caption-1 h-[40px]"
          />
        </Form.Item>
        <Form.Item className="my-[8px]" name={'tiktok'} label="Tiktok">
          <Input
            prefix={<img src={tiktok} alt="website" />}
            placeholder="https://www.tiktok.com/@test"
            className="text-caption-1 h-[40px]"
          />
        </Form.Item>
        <Form.Item className="my-[8px]" name={'instagram'} label="Instagram">
          <Input
            prefix={<img src={ig} alt="website" />}
            placeholder="https://www.instagram.com/@test"
            className="text-caption-1 h-[40px]"
          />
        </Form.Item>
        <Form.Item className="my-[8px]" name={'facebook'} label="Facebook">
          <Input
            prefix={<img src={fb} alt="website" />}
            placeholder="https://www.facebook.com/@test"
            className="text-caption-1 h-[40px]"
          />
        </Form.Item>
      </FormRow>
      <FormRow
        title="Album"
        description="Set your additional photo to your album">
        <Form.Item noStyle name={'vendor_album'}>
          <DraggerUpload form={form} formItemName="vendor_album" limit={10} />
        </Form.Item>
      </FormRow>
    </Form>
  );
};
