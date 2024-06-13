import useFilterVendorTypes from '@/routes/admin/vendor-management/vendor-user-management/repositories/useFilterVendorTypes';
import useQueryVendorTypes from '@/routes/admin/vendor-management/vendor-user-management/repositories/useGetVendorTypes';
import { IVendorLocation } from '@/routes/admin/vendor-management/vendor-user-management/view/container/Create/VendorUserCreate';
import { TGeneralSelectOptions } from '@/shared/models/generalInterfaces';
import useSortSelectOptions from '@/shared/repositories/useSortSelectOptions';
import { FormRow } from '@/shared/view/presentations/form-row/FormRow';
import { Form, InputNumber, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';

interface IVendorAdditionalDetails {
  dynamicSelectOptions: {
    provinceTypes: TGeneralSelectOptions[];
    cityTypes: TGeneralSelectOptions[];
    districtTypes: TGeneralSelectOptions[];
    villageTypes: TGeneralSelectOptions[];
  };
  onLocationChange: React.Dispatch<React.SetStateAction<IVendorLocation>>;
}

export default function VendorAdditionalDetails({
  dynamicSelectOptions,
  onLocationChange,
}: IVendorAdditionalDetails) {
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
              options={vendorTypes}
              placeholder="Enter your detail here!"
              className="text-caption-1"
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
              className="text-caption-1"
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
              className="text-caption-1"
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
              className="text-caption-1"
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
              className="text-caption-1"
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
            className="w-full rounded-[8px] text-caption-1 font-[400] "
          />
        </Form.Item>
      </div>
    </FormRow>
  );
}
