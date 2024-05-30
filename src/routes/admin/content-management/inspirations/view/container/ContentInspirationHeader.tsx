import { Button, Form, Select, type FormInstance } from 'antd';
import addIcon from '@/assets/icon/add.png';
import DashboardTableFilter from '@/shared/view/presentations/dashboard-table/DashboardTableFilter';
import type { TGeneralFilter } from '@/shared/models/generalInterfaces';
import type { TModalType } from '../../usecase/useModalReducer';

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
}

export default function ContentInspirationHeader({
	form,
	handleFilter,
	clearFilter,
	setQuery,
	query,
	create,
	openModal,
}: IContentInspirationHeaderProps) {
	// const modalType = {
	// create: (
	// 	<FormCreation
	// 		roles={roles as TGeneralSelectOptions[]}
	// 		form={formModal}
	// 		handleMutate={mutateCreate}
	// 		footer={
	// 			<FormFooter
	// 				secondaryText="Cancel"
	// 				secondaryProps={{
	// 					onClick: () => closeModal!(),
	// 				}}
	// 				primaryText="Create"
	// 				primaryProps={{ type: 'submit' }}
	// 			/>
	// 		}
	// 	/>
	// ),
	// detail: (
	// 	<LoadingHandler
	// 		isLoading={loadingGetDetail}
	// 		fullscreen={false}
	// 		classname="h-[400px]">
	// 		<FormEdit
	// 			id={modalState?.id}
	// 			roles={roles as TGeneralSelectOptions[]}
	// 			form={formModal}
	// 			handleMutate={undefined}
	// 			onChangePasswordClick={() => openModal!('password', modalState?.id)}
	// 			disable={true}
	// 			footer={
	// 				<FormFooter
	// 					secondaryText="Cancel"
	// 					secondaryProps={{
	// 						onClick: () => closeModal!(),
	// 					}}
	// 					primaryText="Edit"
	// 					primaryProps={{
	// 						onClick: (e) => {
	// 							e.preventDefault();
	// 							openModal!('edit', modalState?.id);
	// 						},
	// 						type: 'button',
	// 						disabled: !edit,
	// 					}}
	// 				/>
	// 			}
	// 		/>
	// 	</LoadingHandler>
	// ),
	// edit: (
	// 	<LoadingHandler
	// 		isLoading={loadingGetDetail}
	// 		fullscreen={false}
	// 		classname="h-[500px]">
	// 		<FormEdit
	// 			id={modalState?.id}
	// 			handleMutate={mutateEdit}
	// 			roles={roles as TGeneralSelectOptions[]}
	// 			form={formModal}
	// 			disable={false}
	// 			onChangePasswordClick={() => openModal!('password', modalState?.id)}
	// 			footer={
	// 				<FormFooter
	// 					secondaryText="Cancel"
	// 					secondaryProps={{
	// 						onClick: () => closeModal!(),
	// 					}}
	// 					primaryText="Save"
	// 					primaryProps={{
	// 						type: 'submit',
	// 					}}
	// 				/>
	// 			}
	// 		/>
	// 	</LoadingHandler>
	// ),
	// };

	return (
		<div className="mb-5">
			{/* <Modal
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
			</Modal> */}
			<DashboardTableFilter
				form={form}
				onApplyFilter={handleFilter}
				onClearFilter={clearFilter}
				onSearch={setQuery}
				queryAdmins={query}
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
					<>
						<Form.Item
							name={'tag'}
							label="Tag"
							// change this
							initialValue={{
								limit: 10,
								page: 1,
								keyword: '',
								status: 'active',
							}}
							className="my-[10px]">
							<Select
								showSearch
								// change this to predefined function (from fix payload creation PR)
								filterOption={(input, option) =>
									(option?.label.toLowerCase() ?? '').includes(
										input.toLowerCase()
									)
								}
								// change this to predefined function (from fix payload creation PR)
								filterSort={(optionA, optionB) =>
									(optionA?.label ?? '')
										.toLowerCase()
										.localeCompare((optionB?.label ?? '').toLowerCase())
								}
								mode="multiple"
								className="w-full max-w-[224px] h-[35px]"
								placeholder="Tag"
								// change this to query
								options={[{ label: '', value: '' }]}
							/>
						</Form.Item>
					</>
				}
			/>
		</div>
	);
}
