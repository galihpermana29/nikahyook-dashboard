import addIcon from '@/assets/icon/add.png';
import LoadingHandler from '@/shared/view/container/loading/Loading';
import DashboardTable from '@/shared/view/presentations/dashboard-table/DashboardTable';
import DashboardTableFilter from '@/shared/view/presentations/dashboard-table/DashboardTableFilter';
import TableHeaderTitle from '@/shared/view/presentations/table-header-title/TableHeaderTitle';
import { Button, Form, Modal, Select } from 'antd';
import ErrorBoundary from '@/shared/view/container/error-boundary/ErrorBoundary';
import { useForm } from 'antd/es/form/Form';
import useMutateCreateVendorUser from './repositories/useCreateVendorUser';
import useQueryVendorUser from './repositories/useGetAllVendorUser';
import useQueryVendorUserDetail from './repositories/useGetDetailVendorUser';
import useMutateEditVendorUser from './repositories/useUpdateVendorUser';
import useGenerateColumnVendorUser from './usecase/useGenerateColumn';
import useModalReducer from './usecase/useModalReducer';
import FormCreation from './view/presentations/Modal/FormCreation';
import FormEdit from './view/presentations/Modal/FormEdit';
import { IDetailUserData } from '@/shared/models/userServicesInterface';
import { AxiosError } from 'axios';
import FormFooter from './view/presentations/Modal/FormFooter';
import FormChangePassword from '@/shared/view/presentations/modal/ChangePasswordModal';
import useMutateEditPassword from '@/shared/repositories/useUpdatePassword';
import { useLoaderData } from 'react-router-dom';
import { ILoaderData } from '@/routes/root';

export const VendorUserManagementContainer = () => {
	const [form] = useForm();
	const [formModal] = useForm();

	const { permissions } = useLoaderData() as ILoaderData;
	const { create, view, edit, remove } = permissions;

	const { openModal, modalState, closeModal } = useModalReducer(formModal);

	const {
		result,
		queryVendorUser,
		setQueryVendorUser,
		isLoading: loadingGetAll,
		handleFilter,
		clearFilter,
		refetch,
		error,
	} = useQueryVendorUser(form);

	const { mutate: mutateCreate } = useMutateCreateVendorUser(
		closeModal,
		refetch
	);
	const { mutate: mutateEdit } = useMutateEditVendorUser(closeModal, refetch);

	const { isLoading: loadingGetDetail } = useQueryVendorUserDetail(
		modalState,
		formModal
	);

	const { columns } = useGenerateColumnVendorUser(
		remove,
		edit,
		view,
		openModal,
		mutateEdit
	);

	const { mutate: mutateEditPassword } = useMutateEditPassword(closeModal);

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
		detail: (
			<LoadingHandler
				isLoading={loadingGetDetail}
				fullscreen={false}
				classname="h-[400px]">
				<FormEdit
					id={modalState?.id}
					form={formModal}
					handleMutate={undefined}
					disable={true}
					onChangePasswordClick={() => openModal!('password')}
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
					form={formModal}
					disable={false}
					onChangePasswordClick={() => openModal!('password')}
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
		),
	};

	return (
		<ErrorBoundary error={error as AxiosError} refetch={refetch}>
			<TableHeaderTitle title="Vendor User Management" />

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
				columns={columns}
				data={result?.data}
				onPaginationChanges={setQueryVendorUser}
				loading={loadingGetAll || loadingGetDetail}
				metadata={result?.meta_data}
				filterComponents={
					<DashboardTableFilter
						form={form}
						queryAdmins={queryVendorUser}
						onApplyFilter={handleFilter}
						onClearFilter={clearFilter}
						onSearch={setQueryVendorUser}
						buttonComponents={
							<Button
								disabled={!create}
								href="vendor-user-management/create-user"
								className="hover:!bg-ny-primary-500 hover:!text-white h-[40px] bg-ny-primary-500 text-white text-body-2  font-[400] rounded-[8px] flex items-center gap-[8px] cursor-pointer">
								<img src={addIcon} alt="add-icon" />
								Create User
							</Button>
						}
						filterComponents={
							<Form.Item
								name={'status'}
								label="Status"
								initialValue={queryVendorUser.status}
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
						}
					/>
				}
			/>
		</ErrorBoundary>
	);
};
