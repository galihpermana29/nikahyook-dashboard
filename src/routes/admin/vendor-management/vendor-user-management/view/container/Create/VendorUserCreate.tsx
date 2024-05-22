import PageHeader from '@/shared/view/presentations/page-header/PageHeader';
import TableHeaderTitle from '@/shared/view/presentations/table-header-title/TableHeaderTitle';
import { useForm } from 'antd/es/form/Form';
import { PageFormCreate } from '../../presentations/PageForm/PageFormCreate';

const VendorUserCreateContainer = () => {
	const [form] = useForm();

	return (
		<div>
			{/* <ErrorBoundary error={{} as AxiosError} refetch={() => ({})}> */}
			<div className="bg-white">
				<TableHeaderTitle title="Create User" withArrow={true} />
				<div className="p-[20px]">
					<PageHeader
						title="Profile Details"
						onCancel={() => form.resetFields()}
						onSave={() => {}}
					/>
				</div>

				<PageFormCreate form={form} />
			</div>

			{/* </ErrorBoundary> */}
		</div>
	);
};

export default VendorUserCreateContainer;
