import ErrorBoundary from '@/shared/view/container/error-boundary/ErrorBoundary';
import TableHeaderTitle from '@/shared/view/presentations/table-header-title/TableHeaderTitle';
import { useForm } from 'antd/es/form/Form';
import { useNavigate } from 'react-router-dom';
import { PageFormCreate } from '../../presentations/PageForm/PageFormCreate';
import useMutateCreateVendorUser from '../../../repositories/useCreateVendorUser';
import { AxiosError } from 'axios';
import useQueryVendorTypes from '../../../repositories/useGetVendorTypes';

const VendorUserCreateContainer = () => {
	const [form] = useForm();

	const navigate = useNavigate();

	const { mutate: mutateCreate, error } = useMutateCreateVendorUser();
	const { result: vendorTypes } = useQueryVendorTypes();

	return (
		<div>
			<ErrorBoundary error={error as AxiosError} refetch={() => {}}>
				<div className="bg-white">
					<TableHeaderTitle title="Create User" withArrow={true} />
					<div className="p-[20px]">
						<PageFormCreate
							dynamicSelectOptions={{
								vendorTypes: vendorTypes ? vendorTypes.data : [],
							}}
							form={form}
							onSave={mutateCreate}
							onCancel={() => {
								form.resetFields();
								navigate(-1);
							}}
						/>
					</div>
				</div>
			</ErrorBoundary>
		</div>
	);
};

export default VendorUserCreateContainer;
