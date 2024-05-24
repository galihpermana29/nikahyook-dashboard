import ErrorBoundary from '@/shared/view/container/error-boundary/ErrorBoundary';
import LoadingHandler from '@/shared/view/container/loading/Loading';
import TableHeaderTitle from '@/shared/view/presentations/table-header-title/TableHeaderTitle';
import { useForm } from 'antd/es/form/Form';
import { useNavigate, useParams } from 'react-router-dom';
import useQueryVendorUserDetail from '../../../repositories/useGetDetailVendorUser';
import useMutateEditVendorUser from '../../../repositories/useUpdateVendorUser';
import { PageFormEdit } from '../../presentations/PageForm/PageFormEdit';
import { AxiosError } from 'axios';
import useModalReducer from '../../../usecase/useModalReducer';
import FormChangePassword from '@/shared/view/presentations/modal/ChangePasswordModal';
import { Modal } from 'antd';
import useMutateEditPassword from '@/shared/repositories/useUpdatePassword';
import FormFooter from '@/shared/view/presentations/form-footer/FormFooter';

const VendorUserEditContainer = () => {
	const [form] = useForm();
	const [formModal] = useForm();

	const { modalState, closeModal, openModal } = useModalReducer(formModal);

	const navigate = useNavigate();

	const { id } = useParams();

	const {
		isLoading: loadingGetDetail,
		refetch,
		error,
	} = useQueryVendorUserDetail(id as string, form);

	const { mutate: mutateEdit } = useMutateEditVendorUser(refetch);

	const { mutate: mutateEditPassword } = useMutateEditPassword(
		closeModal,
		refetch
	);

	const modalType = {
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
		<div>
			<ErrorBoundary error={error as AxiosError} refetch={refetch}>
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

				<div className="bg-white">
					<TableHeaderTitle title="Edit Vendor User" withArrow={true} />
					<div className="p-[20px]">
						<LoadingHandler isLoading={loadingGetDetail} fullscreen={true}>
							<PageFormEdit
								form={form}
								onSave={mutateEdit}
								onChangePasswordClick={() => openModal!('password', id)}
								onCancel={() => {
									navigate(-1);
								}}
								id={id as string}
								disabled={false}
							/>
						</LoadingHandler>
					</div>
				</div>
			</ErrorBoundary>
		</div>
	);
};

export default VendorUserEditContainer;
