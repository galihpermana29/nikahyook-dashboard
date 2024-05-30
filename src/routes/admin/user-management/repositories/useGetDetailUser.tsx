import {
	IUpdateUserClientPayload,
	IUserClientDetail,
	IUserClientDetailExtra,
} from '@/shared/models/userServicesInterface';
import { DashboardUserAPI } from '@/shared/repositories/userServices';
import { FormInstance } from 'antd';
import dayjs from 'dayjs';
import { useQuery } from 'react-query';

const useQueryClientUserDetail = (id: string, form?: FormInstance) => {
	const getDetail = async () => {
		const { data } = await DashboardUserAPI.getUserById(id as string);

		const newData = data as IUpdateUserClientPayload;

		const detail: IUserClientDetail = newData.detail!;

		const detailJson: IUserClientDetailExtra = JSON.parse(
			newData.detail?.json_text as string
		);

		form!.setFieldsValue({
			...data,
			...detail,
			...detailJson,
			date_of_birth: dayjs(data.date_of_birth),
			wedding_date: dayjs(detail.wedding_date),
		});
		return data;
	};

	const { data, error, isLoading, refetch } = useQuery({
		queryKey: ['vendor-detail', id],
		queryFn: getDetail,
		enabled: id ? true : false,
	});

	return { data, error, isLoading, refetch };
};

export default useQueryClientUserDetail;
