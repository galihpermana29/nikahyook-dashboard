import { ILoaderData } from '@/routes/root';
import { useForm } from 'antd/es/form/Form';
import { useLoaderData } from 'react-router-dom';
import useModalReducer from '../../../usecase/useModalReducer';
import useQueryVendorTypes from '../../../respositories/vendor-type/useGetAllVendorTypes';
import { Button, Form, Modal, Select } from 'antd';
import DashboardTable from '@/shared/view/presentations/dashboard-table/DashboardTable';
import { useGenerateVendorTypeColumn } from '../../../usecase/useGenerateVendorTypeColumn';
import ErrorBoundary from '@/shared/view/container/error-boundary/ErrorBoundary';
import DashboardTableFilter from '@/shared/view/presentations/dashboard-table/DashboardTableFilter';
import addIcon from '@/assets/icon/add.png';
import { AxiosError } from 'axios';
import useMutateEditVendorType from '../../../respositories/vendor-type/useUpdateVendorType';
import useQueryVendorTypeDetail from '../../../respositories/vendor-type/useGetDetailVendorType';
import useMutateCreateVendorType from '../../../respositories/vendor-type/useCreateVendorType';
import FormCreation from '../../presentation/Modal/FormCreation';
import FormFooter from '@/shared/view/presentations/form-footer/FormFooter';
import LoadingHandler from '@/shared/view/container/loading/Loading';
import FormEdit from '../../presentation/Modal/FormEdit';

export const VendorTypeContainer = () => {
  const [form] = useForm();
  const [formModal] = useForm();

  const { permissions } = useLoaderData() as ILoaderData;
  const { edit, remove, create } = permissions;

  const { openModal, modalState, closeModal } = useModalReducer(formModal);

  const {
    result,
    error,
    queryVendorTypes,
    setQueryVendorTypes,
    handleFilter,
    clearFilter,
    refetch,
    isLoading: loadingGetAll,
  } = useQueryVendorTypes(form);

  const { mutate: mutateEdit } = useMutateEditVendorType(closeModal, refetch);
  const { isLoading: loadingGetDetail } = useQueryVendorTypeDetail(
    modalState,
    formModal
  );

  const { mutate: mutateCreate } = useMutateCreateVendorType(
    closeModal,
    refetch
  );

  const { columns } = useGenerateVendorTypeColumn(
    remove,
    edit,
    openModal,
    mutateEdit
  );

  const modalType = {
    create: (
      <FormCreation
        form={formModal}
        handleMutate={mutateCreate}
        type="Vendor Type"
        footer={
          <FormFooter
            secondaryText="Cancel"
            secondaryProps={{
              onClick: () => closeModal!(),
            }}
            primaryText="Create"
            primaryProps={{ htmlType: 'submit' }}
          />
        }
      />
    ),
    edit: (
      <LoadingHandler
        isLoading={loadingGetDetail}
        fullscreen={false}
        classname="h-[500px]"
      >
        <FormEdit
          id={modalState?.id}
          handleMutate={mutateEdit}
          form={formModal}
          disable={false}
          type="Vendor Type"
          footer={
            <FormFooter
              secondaryText="Cancel"
              secondaryProps={{
                onClick: () => closeModal!(),
              }}
              primaryText="Edit"
              primaryProps={{ htmlType: 'submit', disabled: !edit }}
            />
          }
        />
      </LoadingHandler>
    ),
  };

  return (
    <ErrorBoundary error={error as AxiosError} refetch={refetch}>
      <>
        <Modal
          title={
            <div className="capitalize">{`${modalState?.type} Product Type`}</div>
          }
          open={modalState?.isOpen}
          footer={null}
          onCancel={closeModal}
        >
          {modalType[modalState!.type]}
        </Modal>
        <DashboardTable
          columns={columns}
          onPaginationChanges={setQueryVendorTypes}
          data={result?.data}
          loading={loadingGetAll}
          metadata={result ? result.meta_data : undefined}
          filterComponents={
            <DashboardTableFilter
              form={form}
              queryAdmins={queryVendorTypes}
              onApplyFilter={handleFilter}
              onClearFilter={clearFilter}
              onSearch={setQueryVendorTypes}
              filterComponents={
                <Form.Item
                  name={'status'}
                  label="Status"
                  initialValue={queryVendorTypes.status}
                  className="my-[10px]"
                >
                  <Select
                    className="h-[35px]"
                    options={[
                      { value: 'default', label: 'All' },
                      { value: 'active', label: 'Active' },
                      { value: 'inactive', label: 'Inactive' },
                    ]}
                  />
                </Form.Item>
              }
              buttonComponents={
                <Button
                  disabled={!create}
                  onClick={() => openModal!('create')}
                  className="enabled:hover:!bg-ny-primary-500 enabled:hover:!text-white h-[40px] bg-ny-primary-500 text-white text-body-2  font-[400] rounded-[8px] flex items-center gap-[8px] cursor-pointer"
                >
                  <img src={addIcon} alt="add-icon" />
                  Create Vendor Type
                </Button>
              }
            />
          }
        />
      </>
    </ErrorBoundary>
  );
};
