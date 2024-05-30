import { DashboardProductAPI } from '@/shared/repositories/productService';
import { FormInstance } from 'antd';
import { useQuery } from 'react-query';
import { TModalState } from '../../usecase/useModalReducer';

const useQueryProductTagDetail = (
	modalState?: TModalState,
	form?: FormInstance<any>
) => {
	const getDetail = async () => {
		const { data } = await DashboardProductAPI.getProductTagDetail(
			modalState?.id as string
		);

		form!.setFieldsValue({
			...data,
		});

		return data;
	};

	const { data, error, isLoading, refetch } = useQuery({
		queryKey: ['vendor-tag-detail', modalState?.id],
		queryFn: getDetail,
		enabled: modalState?.id ? true : false,
	});

	return { data, error, isLoading, refetch };
};

export default useQueryProductTagDetail;
