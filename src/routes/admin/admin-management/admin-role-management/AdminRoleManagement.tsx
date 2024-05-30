import addIcon from '@/assets/icon/add.png';
import ErrorBoundary from '@/shared/view/container/error-boundary/ErrorBoundary';
import DashboardTable from '@/shared/view/presentations/dashboard-table/DashboardTable';
import PageFilter from '@/shared/view/presentations/page-filter/PageFilter';
import TableHeaderTitle from '@/shared/view/presentations/table-header-title/TableHeaderTitle';
import { Button, Form, Modal, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { AxiosError } from 'axios';
import useMutateCreateAdminRole from './repositories/useCreateRole';
import useQueryAdminRoles from './repositories/useGetAllRole';
import useMutateEditAdminRoles from './repositories/useUpdateRole';
import useGenerateColumnAdminRole from './usecase/useGenerateColumn';
import useModalReducer from './usecase/useModalReducer';
import FormCreation from './view/presentation/Modal/FormCreation';
import { IAllRolesData } from '@/shared/models/roleServicesInterface';
import LoadingHandler from '@/shared/view/container/loading/Loading';
import FormEdit from './view/presentation/Modal/FormEdit';
import useQueryRoleDetail from './repositories/useGetDetailRole';
import { useLoaderData } from 'react-router-dom';
import { ILoaderData } from '@/routes/root';
import FormFooter from '@/shared/view/presentations/form-footer/FormFooter';

export const AdminRoleManagementContainer = () => {
  const [form] = useForm();
  const [formModal] = useForm();

  const { permissions } = useLoaderData() as ILoaderData;
  const { create, edit, remove } = permissions;

  const { openModal, closeModal, modalState } = useModalReducer(formModal);

  const {
    result,
    error,
    isLoading: loadingGetAll,
    setQueryAdminRoles,
    queryAdminRoles,
    refetch,
    handleFilter,
    clearFilter,
  } = useQueryAdminRoles(form);

  const { mutate: mutateCreate } = useMutateCreateAdminRole(
    closeModal,
    refetch
  );
  const { mutate: mutateEdit } = useMutateEditAdminRoles(closeModal, refetch);

  const { isLoading: loadingGetDetail, data: detailData } = useQueryRoleDetail(
    modalState,
    formModal
  );

  const { columns } = useGenerateColumnAdminRole(
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
    edit: (
      <LoadingHandler
        isLoading={loadingGetDetail}
        fullscreen={false}
        classname="h-[500px]">
        <FormEdit
          id={modalState?.id}
          detail={detailData}
          handleMutate={mutateEdit}
          form={formModal}
          disable={true}
          footer={
            <FormFooter
              secondaryText="Cancel"
              secondaryProps={{
                onClick: () => closeModal!(),
              }}
              primaryText="Edit"
              primaryProps={{ type: 'submit', disabled: !edit }}
            />
          }
        />
      </LoadingHandler>
    ),
  };

  return (
    <ErrorBoundary error={error as AxiosError} refetch={refetch}>
      <TableHeaderTitle title="Admin Role Management" />

      <Modal
        title={<div className="capitalize">{`${modalState?.type} Role`}</div>}
        open={modalState?.isOpen}
        footer={null}
        onCancel={closeModal}>
        {modalType[modalState!.type]}
      </Modal>

      <DashboardTable<IAllRolesData>
        filterComponents={
          <PageFilter
            form={form}
            query={queryAdminRoles}
            onApplyFilter={handleFilter}
            onClearFilter={clearFilter}
            buttonComponents={
              <Button
                disabled={!create}
                onClick={() => openModal!('create')}
                className="hover:!bg-ny-primary-500 hover:!text-white h-[40px] bg-ny-primary-500 text-white text-body-2  font-[400] rounded-[8px] flex items-center gap-[8px] cursor-pointer">
                <img src={addIcon} alt="add-icon" />
                Create Role
              </Button>
            }
            filterComponents={
              <>
                <Form.Item
                  name={'status'}
                  label="Status"
                  initialValue={queryAdminRoles.status}
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
              </>
            }
            onSearch={setQueryAdminRoles}
          />
        }
        columns={columns}
        data={result?.data}
        loading={loadingGetAll}
        onPaginationChanges={setQueryAdminRoles}
        metadata={result?.meta_data}
      />
    </ErrorBoundary>
  );
};
