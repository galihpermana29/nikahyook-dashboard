import useQueryTags from '@/routes/admin/vendor-management/vendor-content/repositories/useGetAllTags';
import useFilterSelectOptions from '@/shared/repositories/useFilterSelectOptions';
import useSortSelectOptions from '@/shared/repositories/useSortSelectOptions';
import ErrorBoundary from '@/shared/view/container/error-boundary/ErrorBoundary';
import LoadingHandler from '@/shared/view/container/loading/Loading';
import PageFilter from '@/shared/view/presentations/page-filter/PageFilter';
import ProductCard from '@/shared/view/presentations/product-card/ProductCard';
import { Checkbox, Divider, Form, Select, type FormInstance } from 'antd';
import type { AxiosError } from 'axios';
import { useState } from 'react';
import useToggleSelect from '../../../usecase/useToggleSelect';
import useGetTotalSelectedPrice from '../../../repositories/useGetTotalSelectedPrice';
import Pagination from '@/shared/view/presentations/pagination/Pagination';
import useQueryCuratorialProducts from '../../../repositories/useQueryCuratorialProducts';

interface IFormProduct {
  filterForm: FormInstance;
  form: FormInstance;
  fieldName: string;
  priceFieldName?: string;
  closeModal: () => void;
}

export default function ProductModal({
  filterForm,
  form,
  fieldName,
  priceFieldName,
  closeModal,
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
  } = useQueryCuratorialProducts(filterForm);

  const { result: tags } = useQueryTags();

  const [selected, setSelected] = useState<number[]>(
    form?.getFieldValue(fieldName) ?? []
  );

  const items = result && result.data ? result.data : [];

  const totalPrice = useGetTotalSelectedPrice(selected);
  const handleChangePrice = (form: FormInstance) => {
    return priceFieldName
      ? form.setFieldValue(priceFieldName, totalPrice)
      : undefined;
  };

  const handleSubmit = (selected: number[], form: FormInstance) => {
    return form.setFieldValue(fieldName, selected);
  };

  return (
    <ErrorBoundary error={error as AxiosError} refetch={refetch}>
      <LoadingHandler classname="h-[35rem]" isLoading={isLoading}>
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
                className="w-full sm:max-w-[224px] min-h-[40px]"
                placeholder="Tag"
                options={tags?.selectOptions}
              />
            </Form.Item>
          }
        />

        <div className="grid grid-cols-4 gap-2 mt-5 min-h-96">
          {/* make sure selected items are always shown first in the list */}
          {items.map((product) => (
            <button
              className="col-span-4 sm:col-span-2 md:col-span-1"
              key={product.id}
              onClick={() =>
                useToggleSelect({
                  item: product.id,
                  itemsSelected: selected,
                  setItemsSelected: setSelected,
                })
              }>
              <ProductCard
                product={product}
                miscButton={
                  <Checkbox checked={selected.includes(product.id)} />
                }
              />
            </button>
          ))}
        </div>

        <div className="mt-4">
          <Pagination
            onPaginationChanges={setQueryVendorContent}
            metadata={result?.meta_data}
          />
        </div>

        <div className="flex flex-col gap-5">
          <Divider className="mt-5 mb-0" />
          <div className="flex items-center w-full">
            <p className="w-full font-bold">
              Selected {selected.length} item(s)
            </p>

            <div className="flex gap-4 w-full">
              <button
                type="button"
                onClick={() => {
                  setSelected(form?.getFieldValue(fieldName) ?? []);
                  closeModal();
                }}
                className="flex-1 rounded-[8px] h-[40px] bg-ny-primary-100 text-ny-primary-500 text-body-2 font-[400]">
                Cancel
              </button>
              <button
                onClick={() => {
                  handleChangePrice(form);
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
