import addIcon from '@/assets/icon/add.png';
import DashboardTable from '@/shared/view/presentations/dashboard-table/DashboardTable';
import DashboardTableFilter from '@/shared/view/presentations/dashboard-table/DashboardTableFilter';
import { Button, Form, Modal, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import useQueryProductTags from '../../../respositories/useGetAllTags';
import { useGenerateTagDataColumn } from '../../../usecase/useGenerateTagDataColumn';
import { useLoaderData } from 'react-router-dom';
import { ILoaderData } from '@/routes/root';
import useMutateEditProductTag from '../../../respositories/useUpdateTag';
import useModalReducer from '../../../usecase/useModalReducer';
import FormCreation from '../Modal/FormCreation';
import useMutateCreateProductTag from '../../../respositories/useCreateTag';
import FormFooter from '../Modal/FormFooter';
import LoadingHandler from '@/shared/view/container/loading/Loading';
import useQueryProductTagDetail from '../../../respositories/useGetDetailTag';
import FormEdit from '../Modal/FormEdit';

export const TableTagData = () => {
	const [form] = useForm();
	const [formModal] = useForm();

	const { openModal, modalState, closeModal } = useModalReducer(formModal);

	const { permissions } = useLoaderData() as ILoaderData;
	const { edit, remove, create } = permissions;

	const {
		data,
		queryProductTags,
		setQueryProductTags,
		handleFilter,
		clearFilter,
		refetch,
		isLoading: loadingGetAll,
	} = useQueryProductTags(form);

	const { mutate: mutateEdit } = useMutateEditProductTag(closeModal, refetch);

	const { mutate: mutateCreate } = useMutateCreateProductTag(
		closeModal,
		refetch
	);

	const { isLoading: loadingGetDetail } = useQueryProductTagDetail(
		modalState,
		formModal
	);

	const { columns } = useGenerateTagDataColumn(
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
				type='tag'
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
					type='tag'
					footer={
						<FormFooter
							secondaryText="Cancel"
							secondaryProps={{
								onClick: () => closeModal!(),
							}}
							primaryText="Edit"
							primaryProps={{ htmlType: 'submit', disabled: edit }}
						/>
					}
				/>
			</LoadingHandler>
		),
	};

	return (
		<>
			<Modal
				title={<div className="capitalize">{`${modalState?.type} Tag`}</div>}
				open={modalState?.isOpen}
				footer={null}
				onCancel={closeModal}>
				{modalType[modalState!.type]}
			</Modal>

			<DashboardTable
				columns={columns}
				onPaginationChanges={setQueryProductTags}
				data={data?.data}
				loading={loadingGetAll}
				filterComponents={
					<DashboardTableFilter
						form={form}
						queryAdmins={queryProductTags}
						onApplyFilter={handleFilter}
						onClearFilter={clearFilter}
						onSearch={setQueryProductTags}
						filterComponents={
							<Form.Item
								name={'status'}
								label="Status"
								initialValue={queryProductTags.status}
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
	);
};
