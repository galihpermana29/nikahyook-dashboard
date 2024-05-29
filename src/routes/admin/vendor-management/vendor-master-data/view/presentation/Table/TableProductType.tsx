import { AxiosError } from 'axios';
import { Button, Form, Modal, Select } from 'antd';
import { ILoaderData } from '@/routes/root';
import { useForm } from 'antd/es/form/Form';
import { useGenerateProductTypeColumn } from '../../../usecase/useGenerateProductTypeColumn';
import { useLoaderData } from 'react-router-dom';
import addIcon from '@/assets/icon/add.png';
import DashboardTable from '@/shared/view/presentations/dashboard-table/DashboardTable';
import DashboardTableFilter from '@/shared/view/presentations/dashboard-table/DashboardTableFilter';
import ErrorBoundary from '@/shared/view/container/error-boundary/ErrorBoundary';
import FormCreation from '../Modal/FormCreation';
import FormEdit from '../Modal/FormEdit';
import FormFooter from '@/shared/view/presentations/form-footer/FormFooter';
import LoadingHandler from '@/shared/view/container/loading/Loading';
import useModalReducer from '../../../usecase/useModalReducer';
import useMutateCreateProductType from '../../../respositories/useCreateProducType';
import useMutateEditProductType from '../../../respositories/useUpdateProductType';
import useQueryProductTypeDetail from '../../../respositories/useGetDetailProductType';
import useQueryProductTypes from '../../../respositories/useGetAllProductTypes';

export const TableProductType = () => {
	const [form] = useForm();
	const [formModal] = useForm();

	const { permissions } = useLoaderData() as ILoaderData;
	const { edit, remove, create } = permissions;

	const { openModal, modalState, closeModal } = useModalReducer(formModal);

	const {
		result,
		error,
		queryProductTypes,
		setQueryProductTypes,
		handleFilter,
		clearFilter,
		refetch,
		isLoading: loadingGetAll,
	} = useQueryProductTypes(form);

	const { mutate: mutateEdit } = useMutateEditProductType(closeModal, refetch);
	const { isLoading: loadingGetDetail } = useQueryProductTypeDetail(
		modalState,
		formModal
	);

	const { columns } = useGenerateProductTypeColumn(
		remove,
		edit,
		openModal,
		mutateEdit
	);

	const { mutate: mutateCreate } = useMutateCreateProductType(
		closeModal,
		refetch
	);

	const modalType = {
		create: (
			<FormCreation
				form={formModal}
				handleMutate={mutateCreate}
				type="Product Type"
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
				classname="h-[500px]">
				<FormEdit
					id={modalState?.id}
					handleMutate={mutateEdit}
					form={formModal}
					disable={false}
					type="Product Type"
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
					onCancel={closeModal}>
					{modalType[modalState!.type]}
				</Modal>
				<DashboardTable
					columns={columns}
					onPaginationChanges={setQueryProductTypes}
					data={result?.data}
					loading={loadingGetAll}
					metadata={result ? result.meta_data : undefined}
					filterComponents={
						<DashboardTableFilter
							form={form}
							queryAdmins={queryProductTypes}
							onApplyFilter={handleFilter}
							onClearFilter={clearFilter}
							onSearch={setQueryProductTypes}
							filterComponents={
								<Form.Item
									name={'status'}
									label="Status"
									initialValue={queryProductTypes.status}
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
							buttonComponents={
								<Button
									disabled={!create}
									onClick={() => openModal!('create')}
									className="enabled:hover:!bg-ny-primary-500 enabled:hover:!text-white h-[40px] bg-ny-primary-500 text-white text-body-2  font-[400] rounded-[8px] flex items-center gap-[8px] cursor-pointer">
									<img src={addIcon} alt="add-icon" />
									Create Tag
								</Button>
							}
						/>
					}
				/>
			</>
		</ErrorBoundary>
	);
};
