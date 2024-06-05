import useQueryTags from '@/routes/admin/vendor-management/vendor-content/repositories/useGetAllTags';
import type { IDetailInspirationData } from '@/shared/models/inspirationInterfaces';
import useFilterSelectOptions from '@/shared/repositories/useFilterSelectOptions';
import useSortSelectOptions from '@/shared/repositories/useSortSelectOptions';
import ErrorBoundary from '@/shared/view/container/error-boundary/ErrorBoundary';
import LoadingHandler from '@/shared/view/container/loading/Loading';
import InspirationCard from '@/shared/view/presentations/inspiration-card/InspirationCard';
import PageFilter from '@/shared/view/presentations/page-filter/PageFilter';
import { Checkbox, Divider, Form, Select, type FormInstance } from 'antd';
import type { AxiosError } from 'axios';
import { useState } from 'react';
import useToggleSelect from '../../../usecase/useToggleSelect';
import Pagination from '@/shared/view/presentations/pagination/Pagination';
import useQueryCuratorialInspirations from '../../../repositories/useQueryCuratorialInspirations';
import useSplitSelectedItems from '../../../usecase/useSplitSelectedItems';

interface IFormInspiration {
  filterForm: FormInstance;
  form: FormInstance;
  fieldName: string;
  closeModal: () => void;
}

export default function InspirationModal({
  filterForm,
  form,
  fieldName,
  closeModal,
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
  } = useQueryCuratorialInspirations(filterForm);

  const { result: tags } = useQueryTags();

  const [selected, setSelected] = useState<number[]>(
    form?.getFieldValue(fieldName) ?? []
  );

  const items = useSplitSelectedItems({
    data: result?.data as IDetailInspirationData[],
    selectedId: selected,
  });

  const handleSubmit = (selected: number[], form: FormInstance) => {
    return form.setFieldValue(fieldName, selected);
  };

  return (
    <ErrorBoundary error={error as AxiosError} refetch={refetch}>
      <LoadingHandler classname="h-52" isLoading={isLoading}>
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
          {/* make sure selected items are always shown first in the list */}
          {[...items.selected, ...items.not_selected].map((inspiration) => (
            <button
              key={inspiration.id}
              onClick={() =>
                useToggleSelect({
                  item: inspiration.id,
                  itemsSelected: selected,
                  setItemsSelected: setSelected,
                })
              }>
              <InspirationCard
                inspiration={inspiration}
                miscButton={
                  <Checkbox checked={selected.includes(inspiration.id)} />
                }
              />
            </button>
          ))}
        </div>

        <Pagination
          onPaginationChanges={setQuery}
          metadata={result?.meta_data}
        />

        <div className="flex flex-col gap-5">
          <Divider className="mt-5 mb-0" />
          <div className="flex items-center w-full">
            <p className="w-full font-bold">
              Selected {selected.length} / 10 max item(s)
            </p>

            <div className="flex gap-4 w-full">
              <button
                type="button"
                onClick={() => closeModal()}
                className="flex-1 rounded-[8px] h-[40px] bg-ny-primary-100 text-ny-primary-500 text-body-2 font-[400]">
                Cancel
              </button>
              <button
                onClick={() => {
                  handleSubmit(selected, form);
                  closeModal();
                }}
                className="flex-1 rounded-[8px] h-[40px] bg-ny-primary-500 text-white text-body-2 font-[400]">
                Add
              </button>
            </div>
          </div>
        </div>
      </LoadingHandler>
    </ErrorBoundary>
  );
}
