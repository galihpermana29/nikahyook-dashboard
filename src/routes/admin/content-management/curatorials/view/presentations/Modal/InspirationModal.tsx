import useQueryInspirations from '@/routes/admin/content-management/inspirations/repositories/useQueryInspirations';
import InspirationPagination from '@/routes/admin/content-management/inspirations/view/presentations/InspirationPagination';
import useQueryTags from '@/routes/admin/vendor-management/vendor-content/repositories/useGetAllTags';
import type { IDetailInspirationData } from '@/shared/models/inspirationInterfaces';
import useFilterSelectOptions from '@/shared/repositories/useFilterSelectOptions';
import useSortSelectOptions from '@/shared/repositories/useSortSelectOptions';
import ErrorBoundary from '@/shared/view/container/error-boundary/ErrorBoundary';
import LoadingHandler from '@/shared/view/container/loading/Loading';
import InspirationCard from '@/shared/view/presentations/inspiration-card/InspirationCard';
import PageFilter from '@/shared/view/presentations/page-filter/PageFilter';
import { Form, Select, type FormInstance } from 'antd';
import type { AxiosError } from 'axios';

interface IFormInspiration {
  filterForm: FormInstance<any>;
  form: FormInstance<any>;
  fieldName: string;
  footer: React.ReactNode;
}

export default function InspirationModal({
  filterForm,
  form,
  footer,
}: IFormInspiration) {
  const {
    result,
    query,
    setQuery,
    handleFilter,
    clearFilter,
    error,
    refetch,
    isLoading,
  } = useQueryInspirations(filterForm);

  const { result: tags } = useQueryTags();

  return (
    <ErrorBoundary error={error as AxiosError} refetch={refetch}>
      <LoadingHandler classname="h-52" isLoading={isLoading}>
        <Form form={form}>
          <PageFilter
            form={filterForm}
            onApplyFilter={handleFilter}
            onClearFilter={clearFilter}
            onSearch={setQuery}
            query={query}
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
            {result?.data?.map((inspiration: IDetailInspirationData) => (
              <InspirationCard key={inspiration.id} inspiration={inspiration} />
            ))}
          </div>

          <InspirationPagination
            onPaginationChanges={setQuery}
            metadata={result?.meta_data}
          />

          {footer}
        </Form>
      </LoadingHandler>
    </ErrorBoundary>
  );
}
