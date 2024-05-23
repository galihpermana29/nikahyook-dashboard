import ErrorBoundary from '@/shared/view/container/error-boundary/ErrorBoundary';
import TableHeaderTitle from '@/shared/view/presentations/table-header-title/TableHeaderTitle';
import PageFormEdit from '../../presentations/PageForm/PageFormEdit';
import { useForm } from 'antd/es/form/Form';
import useQueryVendorContentsDetail from '../../../repositories/useGetDetailContent';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingHandler from '@/shared/view/container/loading/Loading';
import useMutateEditVendorContent from '../../../repositories/useUpdateContent';
import { AxiosError } from 'axios';

const VendorProductDetailContainer = () => {
	const [form] = useForm();
	const navigate = useNavigate();
	const { id } = useParams();
	const {
		isLoading: loadingGetDetail,
		refetch,
		error,
	} = useQueryVendorContentsDetail(id as string, form);

	const { mutate: mutateEdit } = useMutateEditVendorContent(refetch);

	return (
		<div>
			<ErrorBoundary error={error as AxiosError} refetch={refetch}>
				<TableHeaderTitle title="Detail Vendor Product" withArrow={true} />
				<div className="p-[20px]">
					<LoadingHandler isLoading={loadingGetDetail} fullscreen={true}>
						<PageFormEdit
							disabled={true}
							id={id as string}
							form={form}
							onSave={mutateEdit}
							onCancel={() => navigate(-1)}
						/>
					</LoadingHandler>
				</div>
			</ErrorBoundary>
		</div>
	);
};

export default VendorProductDetailContainer;
