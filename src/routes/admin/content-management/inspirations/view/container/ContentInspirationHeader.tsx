import { Button, Form, Modal, Select, type FormInstance } from 'antd';
import addIcon from '@/assets/icon/add.png';
import PageFilter from '@/shared/view/presentations/page-filter/PageFilter';
import type { TGeneralFilter } from '@/shared/models/generalInterfaces';
import type { TModalState, TModalType } from '../../usecase/useModalReducer';
import useSortSelectOptions from '@/shared/repositories/useSortSelectOptions';
import useFilterSelectOptions from '@/shared/repositories/useFilterSelectOptions';
import FormCreation from '../presentations/Modal/FormCreation';
import FormFooter from '@/shared/view/presentations/form-footer/FormFooter';

interface IContentInspirationHeaderProps {
  form: FormInstance<any>;
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
}

export default function ContentInspirationHeader({
  form,
  handleFilter,
  clearFilter,
  setQuery,
  query,
  create,
  openModal,
  closeModal,
  modalState,
}: IContentInspirationHeaderProps) {
  const [formModal] = Form.useForm();

  const modalType = {
    create: (
      <FormCreation
        form={formModal}
        // TODO: add use mutate from API
        // handleMutate={mutateCreate}
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
            disabled={!create}
            onClick={() => openModal!('create')}
            className="hover:!bg-ny-primary-500 hover:!text-white h-[40px] bg-ny-primary-500 text-white text-body-2  font-[400] rounded-[8px] flex items-center gap-[8px] cursor-pointer">
            <img src={addIcon} alt="add-icon" />
            Add Inspiration
          </Button>
        }
        filterComponents={
          <Form.Item name={'tag'} label="Tag" className="my-[10px]">
            <Select
              showSearch
              filterOption={useFilterSelectOptions}
              filterSort={useSortSelectOptions}
              mode="multiple"
              className="w-full max-w-[224px] h-[35px]"
              placeholder="Tag"
              // TODO: change this to query result
              options={[{ label: 'Tes tag', value: '1' }]}
            />
          </Form.Item>
        }
      />
    </div>
  );
}
