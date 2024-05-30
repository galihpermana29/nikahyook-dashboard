import ErrorBoundary from '@/shared/view/container/error-boundary/ErrorBoundary';
import LoadingHandler from '@/shared/view/container/loading/Loading';
import TableHeaderTitle from '@/shared/view/presentations/table-header-title/TableHeaderTitle';
import { useForm } from 'antd/es/form/Form';
import { useNavigate, useParams } from 'react-router-dom';
import useQueryVendorUserDetail from '../../../repositories/useGetDetailVendorUser';
import useMutateEditVendorUser from '../../../repositories/useUpdateVendorUser';
import { PageFormEdit } from '../../presentations/PageForm/PageFormEdit';
import { AxiosError } from 'axios';
import useQueryVendorTypes from '../../../repositories/useGetVendorTypes';

const VendorUserDetailContainer = () => {
	const [form] = useForm();

	const navigate = useNavigate();

	const { id } = useParams();

	const {
		isLoading: loadingGetDetail,
		refetch,
		error,
	} = useQueryVendorUserDetail(id as string, form);

	const { mutate: mutateEdit } = useMutateEditVendorUser(refetch);
	const { result: vendorTypes } = useQueryVendorTypes();

	return (
		<div>
			<ErrorBoundary error={error as AxiosError} refetch={refetch}>
				<div className="bg-white">
					<TableHeaderTitle title="Vendor User Detail" withArrow={true} />
					<div className="p-[20px]">
						<LoadingHandler isLoading={loadingGetDetail} fullscreen={true}>
							<PageFormEdit
								dynamicSelectOptions={{
									vendorTypes: vendorTypes ? vendorTypes.data : [],
								}}
								form={form}
								onSave={mutateEdit}
								onCancel={() => {
									navigate(-1);
								}}
								id={id as string}
								disabled={true}
								showEditButton
							/>
						</LoadingHandler>
					</div>
				</div>
			</ErrorBoundary>
		</div>
	);
};

export default VendorUserDetailContainer;
