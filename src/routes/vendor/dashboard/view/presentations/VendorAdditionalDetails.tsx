import useFilterVendorTypes from '@/routes/admin/vendor-management/vendor-user-management/repositories/useFilterVendorTypes';
import useQueryVendorTypes from '@/routes/admin/vendor-management/vendor-user-management/repositories/useGetVendorTypes';
import useSortSelectOptions from '@/shared/repositories/useSortSelectOptions';
import { FormRow } from '@/shared/view/presentations/form-row/FormRow';
import { Geocoder } from '@mapbox/search-js-react';
import { Form, Select, type FormInstance } from 'antd';
import TextArea from 'antd/es/input/TextArea';

export default function VendorAdditionalDetails({
  form,
}: {
  form: FormInstance<any>;
}) {
  const { result } = useQueryVendorTypes();
  const vendorTypes = result?.data ?? [];

  return (
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
            name={'location'}
            label="Vendor Location"
            rules={[
              {
                required: true,
                message: 'Please select vendor location!',
              },
            ]}>
            <Geocoder
              onRetrieve={(res) => {
                form.setFieldValue('location', res.properties.full_address);
              }}
              accessToken={import.meta.env.VITE_MAPBOX_KEY}
            />
          </Form.Item>
          <Form.Item
            className="my-[8px] w-full"
            name={'vendor_type_id'}
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
              options={vendorTypes}
              placeholder="Enter your detail here!"
              className="text-caption-1"
            />
          </Form.Item>
        </div>
      </div>
    </FormRow>
  );
}
