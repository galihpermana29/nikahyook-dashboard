import { Button, Form, Select, type FormInstance } from 'antd';
import addIcon from '@/assets/icon/add.png';
import PageFilter from '@/shared/view/presentations/page-filter/PageFilter';
import type {
  TGeneralFilter,
  TGeneralSelectOptions,
} from '@/shared/models/generalInterfaces';
import type { TModalState, TModalType } from '@/shared/usecase/useModalReducer';
import useSortSelectOptions from '@/shared/repositories/useSortSelectOptions';
import useFilterSelectOptions from '@/shared/repositories/useFilterSelectOptions';
import type { UseMutateFunction } from 'react-query';
import type {
  ICreateInspirationInputRoot,
  ICreateInspirationResponseRoot,
} from '@/shared/models/inspirationInterfaces';
import type { AxiosError } from 'axios';

interface IContentInspirationHeaderProps {
  form: FormInstance<any>;
  formModal: FormInstance<any>;
  handleFilter: (value: any) => void;
  clearFilter: () => void;
  setQuery: React.Dispatch<React.SetStateAction<TGeneralFilter>>;
  query: TGeneralFilter;
  create: boolean;
  tags?: TGeneralSelectOptions[];
  openModal:
    | ((modalType: TModalType, id?: string | undefined) => void)
    | undefined;
  closeModal: (() => void) | undefined;
  modalState: TModalState | undefined;
  handleMutate: UseMutateFunction<
    ICreateInspirationResponseRoot,
    AxiosError<unknown, any>,
    ICreateInspirationInputRoot
  >;
}

export default function ContentInspirationHeader({
  form,
  tags,
  handleFilter,
  clearFilter,
  setQuery,
  query,
  create,
  openModal,
}: IContentInspirationHeaderProps) {
  return (
    <div className="mb-5">
      <PageFilter
        form={form}
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
              options={tags}
            />
          </Form.Item>
        }
        buttonComponents={
          <Button
            disabled={!create}
            onClick={() => openModal!('create')}
            className="hover:!bg-ny-primary-500 hover:!text-white h-[40px] bg-ny-primary-500 text-white text-body-2  font-[400] rounded-[8px] flex items-center gap-[8px] cursor-pointer">
            <img src={addIcon} alt="add-icon" />
            Add Inspiration
          </Button>
        }
      />
    </div>
  );
}
