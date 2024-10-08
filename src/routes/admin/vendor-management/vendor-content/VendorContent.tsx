import DashboardTable from '@/shared/view/presentations/dashboard-table/DashboardTable';
import PageFilter from '@/shared/view/presentations/page-filter/PageFilter';
import PageTitle from '@/shared/view/presentations/page-title/PageTitle';
import { Form, InputNumber, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import useQueryVendorContent from './repositories/useGetAllContent';
import useGenerateColumnVendorProduct from './usecase/useGenerateColumn';
import useMutateEditVendorContent from './repositories/useUpdateContent';
import ErrorBoundary from '@/shared/view/container/error-boundary/ErrorBoundary';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { IDetailProductData } from '@/shared/models/productServicesInterface';
import useQueryTags from './repositories/useGetAllTags';
import useMutateCreateNotification from '@/shared/repositories/useCreateNotification';

export const VendorContentContainer = () => {
  const [form] = useForm();
  const navigate = useNavigate();

  const {
    result,
    queryVendorContent,
    setQueryVendorContent,
    isLoading,
    handleFilter,
    clearFilter,
    refetch,
    error,
  } = useQueryVendorContent(form);

  const { result: resultTags } = useQueryTags();
  const { mutate: mutateCreateNotification } = useMutateCreateNotification();
  const { mutate: mutateEdit } = useMutateEditVendorContent(
    refetch,
    null,
    null
  );

  const { columns } = useGenerateColumnVendorProduct(
    navigate,
    mutateEdit,
    mutateCreateNotification
  );

  return (
    <ErrorBoundary error={error as AxiosError} refetch={refetch}>
      <PageTitle title="Vendor Product" />

      <DashboardTable<IDetailProductData[]>
        columns={columns}
        onPaginationChanges={setQueryVendorContent}
        loading={isLoading}
        data={result?.data}
        metadata={result ? result.meta_data : undefined}
        filterComponents={
          <PageFilter
            form={form}
            query={queryVendorContent}
            onApplyFilter={handleFilter}
            onClearFilter={clearFilter}
            onSearch={setQueryVendorContent}
            buttonComponents={undefined}
            filterComponents={
              <>
                <Form.Item
                  name={'status'}
                  label="Status"
                  initialValue={queryVendorContent.status}
                  className="my-[10px]">
                  <Select
                    className="h-[35px]"
                    options={[
                      { value: 'default', label: 'All' },
                      { value: 'active', label: 'Active' },
                      { value: 'inactive', label: 'Inactive' },
                    ]}
                  />
                </Form.Item>
                <Form.Item
                  name={'tags'}
                  label="Tag"
                  initialValue={queryVendorContent.tags}
                  className="my-[10px]">
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
                    className="w-full max-w-[224px]"
                    placeholder="Tag"
                    options={resultTags?.selectOptions}
                  />
                </Form.Item>
                <Form.Item
                  label="Price"
                  name={'min_price'}
                  initialValue={queryVendorContent.min_price}
                  className="my-[10px]">
                  <InputNumber
                    formatter={(value: any) =>
                      `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    }
                    parser={(value: any) =>
                      value?.replace(/\$\s?|(,*)/g, '') as unknown as number
                    }
                    value={queryVendorContent.min_price}
                    className="h-[35px] w-full max-w-[300px] rounded-[8px] [&>input]:!text-caption-1 [&>input]:!font-[400]"
                    placeholder="Min Price"
                  />
                </Form.Item>
                <Form.Item
                  name={'max_price'}
                  initialValue={queryVendorContent.max_price}
                  className="my-[10px]">
                  <InputNumber
                    formatter={(value: any) =>
                      `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    }
                    parser={(value: any) =>
                      value?.replace(/\$\s?|(,*)/g, '') as unknown as number
                    }
                    value={queryVendorContent.max_price}
                    className="h-[35px] w-full max-w-[300px] rounded-[8px] [&>input]:!text-caption-1 [&>input]:!font-[400]"
                    placeholder="Max Price"
                  />
                </Form.Item>
              </>
            }
          />
        }
      />
    </ErrorBoundary>
  );
};
