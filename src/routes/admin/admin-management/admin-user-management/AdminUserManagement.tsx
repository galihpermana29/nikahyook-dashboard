import { AxiosError } from 'axios';
import { Button, Form, Modal, Select } from 'antd';
import { IDetailUserData } from '@/shared/models/userServicesInterface';
import { TGeneralSelectOptions } from '@/shared/models/generalInterfaces';
import { useForm } from 'antd/es/form/Form';
import addIcon from '@/assets/icon/add.png';

import DashboardTable from '@/shared/view/presentations/dashboard-table/DashboardTable';
import ErrorBoundary from '@/shared/view/container/error-boundary/ErrorBoundary';
import FormCreation from './view/presentations/Modal/FormCreation';
import useGenerateColumnAdminUser from './usecase/useGenerateColumn';
import useMutateCreateAdmins from './repositories/useCreateUser';
import useQueryAdmins from './repositories/useGetAllUser';
import FormEdit from './view/presentations/Modal/FormEdit';
import useQueryAdminsDetail from './repositories/useGetDetailUser';
import LoadingHandler from '@/shared/view/container/loading/Loading';
import useMutateEditAdmins from './repositories/useUpdateUser';
import FormChangePassword from '@/shared/view/presentations/modal/ChangePasswordModal';
import useMutateEditPassword from '@/shared/repositories/useUpdatePassword';
import { useLoaderData } from 'react-router-dom';
import { ILoaderData } from '@/routes/root';
import FormFooter from '@/shared/view/presentations/form-footer/FormFooter';
import PageTitle from '@/shared/view/presentations/page-title/PageTitle';
import PageFilter from '@/shared/view/presentations/page-filter/PageFilter';
import useModalReducer from '@/shared/usecase/useModalReducer';

const AdminUserManagementContainer = () => {
  const [form] = useForm();
  const [formModal] = useForm();

  const { permissions } = useLoaderData() as ILoaderData;
  const { create, view, edit, remove } = permissions;

  const { openModal, closeModal, modalState } = useModalReducer(formModal);

  const {
    result,
    roles,
    error,
    isLoading: loadingGetAll,
    setQueryAdmins,
    queryAdmins,
    refetch,
    handleFilter,
    clearFilter,
  } = useQueryAdmins(form);

  const { mutate: mutateCreate } = useMutateCreateAdmins(closeModal, refetch);

  const { isLoading: loadingGetDetail } = useQueryAdminsDetail(
    modalState,
    formModal
  );
  const { mutate: mutateEdit } = useMutateEditAdmins(closeModal, refetch);
  const { columns } = useGenerateColumnAdminUser(
    remove,
    edit,
    view,
    openModal,
    mutateEdit
  );

  const { mutate: mutateEditPassword } = useMutateEditPassword(
    closeModal,
    refetch
  );

  const modalType = {
    create: (
      <FormCreation
        roles={roles as TGeneralSelectOptions[]}
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
    detail: (
      <LoadingHandler
        isLoading={loadingGetDetail}
        fullscreen={false}
        classname="h-[400px]">
        <FormEdit
          id={modalState?.id}
          roles={roles as TGeneralSelectOptions[]}
          form={formModal}
          handleMutate={undefined}
          onChangePasswordClick={() => openModal!('password', modalState?.id)}
          disable={true}
          footer={
            <FormFooter
              secondaryText="Cancel"
              secondaryProps={{
                onClick: () => closeModal!(),
              }}
              primaryText="Edit"
              primaryProps={{
                onClick: (e) => {
                  e.preventDefault();
                  openModal!('edit', modalState?.id);
                },
                type: 'button',
                disabled: !edit,
              }}
            />
          }
        />
      </LoadingHandler>
    ),
    edit: (
      <LoadingHandler
        isLoading={loadingGetDetail}
        fullscreen={false}
        classname="h-[500px]">
        <FormEdit
          id={modalState?.id}
          handleMutate={mutateEdit}
          roles={roles as TGeneralSelectOptions[]}
          form={formModal}
          disable={false}
          onChangePasswordClick={() => openModal!('password', modalState?.id)}
          footer={
            <FormFooter
              secondaryText="Cancel"
              secondaryProps={{
                onClick: () => closeModal!(),
              }}
              primaryText="Save"
              primaryProps={{
                type: 'submit',
              }}
            />
          }
        />
      </LoadingHandler>
    ),
    password: (
      <LoadingHandler
        isLoading={loadingGetDetail}
        fullscreen={false}
        classname="h-[500px]">
        <FormChangePassword
          id={modalState?.id}
          form={formModal}
          handleMutate={mutateEditPassword}
          footer={
            <FormFooter
              secondaryText="Cancel"
              secondaryProps={{
                onClick: () => closeModal!(),
              }}
              primaryText="Save"
              primaryProps={{ type: 'submit' }}
            />
          }
        />
      </LoadingHandler>
    ),
  };

  return (
    <div>
      <ErrorBoundary error={error as AxiosError} refetch={refetch}>
        <>
          <PageTitle title="Admin User Management" />
          <Modal
            title={
              <div className="capitalize">
                {modalState?.type === 'password'
                  ? 'Change Password'
                  : `${modalState?.type} User`}
              </div>
            }
            open={modalState?.isOpen}
            footer={null}
            onCancel={closeModal}>
            {modalType[modalState!.type]}
          </Modal>

          <DashboardTable<IDetailUserData>
            filterComponents={
              <PageFilter
                form={form}
                query={queryAdmins}
                onApplyFilter={handleFilter}
                onClearFilter={clearFilter}
                buttonComponents={
                  <Button
                    disabled={!create}
                    onClick={() => openModal!('create')}
                    className="hover:!bg-ny-primary-500 hover:!text-white h-[40px] bg-ny-primary-500 text-white text-body-2  font-[400] rounded-[8px] flex items-center gap-[8px] cursor-pointer">
                    <img src={addIcon} alt="add-icon" />
                    Create User
                  </Button>
                }
                filterComponents={
                  <>
                    <Form.Item
                      name={'status'}
                      label="Status"
                      initialValue={queryAdmins.status}
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
                onSearch={setQueryAdmins}
              />
            }
            columns={columns}
            data={result ? result.data : undefined}
            loading={loadingGetAll || loadingGetDetail}
            metadata={result ? result.meta_data : undefined}
            onPaginationChanges={setQueryAdmins}
          />
        </>
      </ErrorBoundary>
    </div>
  );
};

export default AdminUserManagementContainer;
