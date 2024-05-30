import {
	IUserVendorDetail,
	type IUserVendorDetailJSON,
} from '@/shared/models/userServicesInterface';
import { DashboardUserAPI } from '@/shared/repositories/userServices';
import { FormInstance } from 'antd';
import dayjs from 'dayjs';
import { useQuery } from 'react-query';

const useQueryVendorUserDetail = (id: string, form?: FormInstance) => {
	const getDetail = async () => {
		const { data } = await DashboardUserAPI.getUserById(id as string);

		const vendorDetail: IUserVendorDetail = data.detail;
		const vendorDetailJSON: IUserVendorDetailJSON = vendorDetail.json_text
			? JSON.parse(vendorDetail.json_text)
			: {
					vendor_description: '',
					vendor_album: [],
			  };

		form!.setFieldsValue({
			...data,
			date_of_birth: dayjs(data.date_of_birth),
			location: vendorDetail.location,
			vendor_type_id: vendorDetail.vendor_type_id,
			vendor_description: vendorDetailJSON.vendor_description,
			vendor_album: vendorDetailJSON.vendor_album,
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

export default useQueryVendorUserDetail;
