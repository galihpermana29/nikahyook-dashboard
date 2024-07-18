import useFilterVendorTypes from '@/routes/admin/vendor-management/vendor-user-management/repositories/useFilterVendorTypes';
import { IVendorLocation } from '@/routes/admin/vendor-management/vendor-user-management/view/container/Create/VendorUserCreate';
import { TGeneralSelectOptions } from '@/shared/models/generalInterfaces';
import useSortSelectOptions from '@/shared/repositories/useSortSelectOptions';
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
    provinceTypes: TGeneralSelectOptions[];
    cityTypes: TGeneralSelectOptions[];
    districtTypes: TGeneralSelectOptions[];
    villageTypes: TGeneralSelectOptions[];
    tags: TGeneralSelectOptions[];
    productTypes: TGeneralSelectOptions[];
    cityCoverageTypes: TGeneralSelectOptions[];
  };
  onLocationChange: React.Dispatch<React.SetStateAction<IVendorLocation>>;
  onActiveCoverageChange: any;
  activeCoverage: any;
  setCoverageState: React.Dispatch<React.SetStateAction<any[]>>;
}

const PageFormEdit = ({
  form,
  onSave,
  onCancel,
  id,
  disabled = false,
  dynamicSelectOptions,
  onLocationChange,
  onActiveCoverageChange,
  activeCoverage,
  setCoverageState,
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
            <div className="flex gap-[10px]">
              <Form.Item
                className="my-[8px] flex-1"
                name={'price'}
                label="Price"
                rules={[
                  {
                    required: true,
                    message: 'Please input your product price',
                  },
                ]}>
                <InputNumber<number>
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                  parser={(value) =>
                    value?.replace(/\$\s?|(,*)/g, '') as unknown as number
                  }
                  placeholder="Enter your product price"
                  className="h-[40px] rounded-[8px] text-caption-1 font-[400] w-full custom-input"
                />
              </Form.Item>
              <Form.Item
                className="my-[8px] flex-1"
                name={'quantity_label'}
                label="Quantity Label "
                rules={[
                  {
                    required: true,
                    message: 'Please input your product quantity label',
                  },
                ]}>
                <Input
                  addonBefore={'/'}
                  placeholder="(pcs/day/week/pckg)"
                  className="h-[40px] rounded-[8px] text-caption-1 font-[400] w-full custom-input"
                />
              </Form.Item>
            </div>
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
            <div className="flex w-full gap-2">
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: 'Please select province!',
                  },
                ]}
                className="my-[8px] w-full"
                name={'province'}
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
                name={'city'}
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
                name={'district'}
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
                name={'village'}
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
              className="my-[8px]"
              name={'postal_code'}
              label="Postal Code">
              <InputNumber
                min={0}
                placeholder="Enter your detail here"
                className="w-full rounded-[8px] text-caption-1 font-[400] "
              />
            </Form.Item>
          </div>
        </div>
        <div className="flex">
          <div className="w-full max-w-[300px] gap-[20px]">
            <h1 className="text-[#262626] text-body-2">Additonal Details</h1>
            <p className="text-[#949494] text-caption-1">
              Product's city location coverages
            </p>
          </div>
          <div className="flex-1">
            <div className="flex w-full gap-2">
              <Form.Item
                className="my-[8px] w-full"
                name={'coverage_province'}
                label="Coverage Province">
                <Select
                  onChange={(_, opt: any) => {
                    onActiveCoverageChange({ province: opt, city: [] });
                  }}
                  mode="multiple"
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
                className="my-[8px] w-full"
                name={'coverage_city'}
                label="Coverage City">
                <Select
                  onChange={(_, opt: any) => {
                    const options = [
                      ...opt,
                      ...(activeCoverage.city.length > 0
                        ? activeCoverage.city
                        : []),
                    ].filter((dz) =>
                      Object.prototype.hasOwnProperty.call(dz, 'value')
                    );
                    const values = options.map((dx) => ({
                      province: activeCoverage.province.filter(
                        (dy) => dy.value.slice(0, 2) === dx.value.slice(0, 2)
                      )[0],
                      city: dx,
                    }));

                    setCoverageState(values);
                  }}
                  mode="multiple"
                  showSearch
                  optionFilterProp="children"
                  filterOption={useFilterVendorTypes}
                  filterSort={useSortSelectOptions}
                  options={dynamicSelectOptions.cityCoverageTypes}
                  placeholder="Enter your detail here!"
                  className="text-caption-1"
                />
              </Form.Item>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default PageFormEdit;
