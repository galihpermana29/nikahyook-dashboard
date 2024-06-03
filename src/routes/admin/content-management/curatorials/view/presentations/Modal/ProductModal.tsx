import InspirationPagination from '@/routes/admin/content-management/inspirations/view/presentations/InspirationPagination';
import useQueryVendorContent from '@/routes/admin/vendor-management/vendor-content/repositories/useGetAllContent';
import useQueryTags from '@/routes/admin/vendor-management/vendor-content/repositories/useGetAllTags';
import type { IDetailProductData } from '@/shared/models/productServicesInterface';
import useFilterSelectOptions from '@/shared/repositories/useFilterSelectOptions';
import useSortSelectOptions from '@/shared/repositories/useSortSelectOptions';
import ErrorBoundary from '@/shared/view/container/error-boundary/ErrorBoundary';
import LoadingHandler from '@/shared/view/container/loading/Loading';
import PageFilter from '@/shared/view/presentations/page-filter/PageFilter';
import ProductCard from '@/shared/view/presentations/product-card/ProductCard';
import { Form, Select, type FormInstance } from 'antd';
import type { AxiosError } from 'axios';

interface IFormProduct {
  filterForm: FormInstance<any>;
  form: FormInstance<any>;
  fieldName: string;
  footer: React.ReactNode;
}

export default function ProductModal({
  filterForm,
  form,
  footer,
}: IFormProduct) {
  const {
    result,
    queryVendorContent,
    setQueryVendorContent,
    handleFilter,
    clearFilter,
    error,
    refetch,
    isLoading,
  } = useQueryVendorContent(filterForm);

  const { result: tags } = useQueryTags();

  return (
    <ErrorBoundary error={error as AxiosError} refetch={refetch}>
      <LoadingHandler classname="h-52" isLoading={isLoading}>
        <Form form={form}>
          <PageFilter
            form={filterForm}
            onApplyFilter={handleFilter}
            onClearFilter={clearFilter}
            onSearch={setQueryVendorContent}
            query={queryVendorContent}
            filterComponents={
              <Form.Item name={'tags'} label="Tags" className="my-2">
                <Select
                  showSearch
                  filterOption={useFilterSelectOptions}
                  filterSort={useSortSelectOptions}
                  mode="multiple"
                  className="w-full max-w-[224px] min-h-[40px]"
                  placeholder="Tag"
                  options={tags?.selectOptions}
                />
              </Form.Item>
            }
          />

          <div className="grid grid-cols-4 gap-2 mt-5">
            {result?.data?.map((product: IDetailProductData) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <InspirationPagination
            onPaginationChanges={setQueryVendorContent}
            metadata={result?.meta_data}
          />

          {footer}
        </Form>
      </LoadingHandler>
    </ErrorBoundary>
  );
}
