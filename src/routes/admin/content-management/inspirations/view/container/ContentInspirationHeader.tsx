import { Button, Form, Modal, Select, type FormInstance } from 'antd';
import addIcon from '@/assets/icon/add.png';
import PageFilter from '@/shared/view/presentations/page-filter/PageFilter';
import type { TGeneralFilter } from '@/shared/models/generalInterfaces';
import type { TModalState, TModalType } from '@/shared/usecase/useModalReducer';
import useSortSelectOptions from '@/shared/repositories/useSortSelectOptions';
import useFilterSelectOptions from '@/shared/repositories/useFilterSelectOptions';
import FormCreation from '../presentations/Modal/FormCreation';
import FormFooter from '@/shared/view/presentations/form-footer/FormFooter';
import type { UseMutateFunction } from 'react-query';
import type {
  ICreateInspirationInputRoot,
  ICreateInspirationResponseRoot,
} from '@/shared/models/inspirationInterfaces';
import type { AxiosError } from 'axios';
import useQueryTags from '@/routes/admin/vendor-management/vendor-content/repositories/useGetAllTags';

interface IContentInspirationHeaderProps {
  form: FormInstance<any>;
  formModal: FormInstance<any>;
  handleFilter: (value: any) => void;
  clearFilter: () => void;
  setQuery: React.Dispatch<React.SetStateAction<TGeneralFilter>>;
  query: TGeneralFilter;
  create: boolean;
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
  formModal,
  handleFilter,
  clearFilter,
  setQuery,
  query,
  create,
  openModal,
  closeModal,
  modalState,
  handleMutate,
}: IContentInspirationHeaderProps) {
  const modalType = {
    create: (
      <FormCreation
        form={formModal}
        handleMutate={handleMutate}
        footer={
          <FormFooter
            secondaryText="Cancel"
            secondaryProps={{
              onClick: () => closeModal!(),
            }}
            primaryText="Create"
            primaryProps={{ type: 'submit' }}
          />
        }
      />
    ),
  };

  const { result: tags, isLoading } = useQueryTags();

  return (
    <div className="mb-5">
      <Modal
        title={
          <div className="capitalize">{`${modalState?.type} Inspiration`}</div>
        }
        open={modalState?.isOpen}
        footer={null}
        onCancel={closeModal}>
        {modalType[modalState!.type]}
      </Modal>

      <PageFilter
        form={form}
        onApplyFilter={handleFilter}
        onClearFilter={clearFilter}
        onSearch={setQuery}
        query={query}
        buttonComponents={
          <Button
            disabled={create}
            onClick={() => openModal!('create')}
            className="hover:!bg-ny-primary-500 hover:!text-white h-[40px] bg-ny-primary-500 text-white text-body-2  font-[400] rounded-[8px] flex items-center gap-[8px] cursor-pointer">
            <img src={addIcon} alt="add-icon" />
            Add Inspiration
          </Button>
        }
        filterComponents={
          <Form.Item name={'tags'} label="Tag" className="my-[10px]">
            <Select
              showSearch
              loading={isLoading}
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
    </div>
  );
}
