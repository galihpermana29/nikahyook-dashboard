import {
	IUpdateUserClientInput,
	IUpdateUserClientPayload,
	IUpdateUserPayloadRoot,
	IUserClientDetail,
	IUserClientDetailExtra,
} from '@/shared/models/userServicesInterface';
import { DashboardUserAPI } from '@/shared/repositories/userServices';
import useErrorAxios from '@/shared/usecase/useErrorAxios';
import useSuccessAxios from '@/shared/usecase/useSuccessAxios';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { useMutation } from 'react-query';

const useMutateEditClientUser = (refetch?: () => void) => {
	const { generateErrorMsg, showPopError } = useErrorAxios();
	const { showSuccessMessage } = useSuccessAxios();

	const editClientUser = async (
		payload: IUpdateUserClientInput,
		id: string
	) => {
		const detail: IUserClientDetail = {
			gender: payload.gender,
			location: payload.location,
			wedding_date: dayjs(payload.wedding_date).format('YYYY-MM-DD'),
		};

		const detailJson: IUserClientDetailExtra = {
			bride_name: payload.bride_name,
			groom_name: payload.groom_name,
			plan_for: payload.plan_for,
			wedding_role: payload.wedding_role,
			wedding_theme: payload.wedding_theme,
		};

		const newPayload: IUpdateUserClientPayload = {
			name: payload.name,
			email: payload.email,
			profile_image_uri: payload.profile_image_uri ?? '',
			date_of_birth: dayjs(payload.date_of_birth).format('YYYY-MM-DD'),
			detail: {
				json_text: JSON.stringify(detailJson),
				...detail,
			},
		};

		const data = await DashboardUserAPI.editUser(newPayload, id);
		return data;
	};

	const updateStatus = async (payload: IUpdateUserPayloadRoot, id: string) => {
		const data = await DashboardUserAPI.editUser(payload, id);
		return data;
	};

	const handleError = (error: AxiosError) => {
		const msg = generateErrorMsg(error);
		showPopError(msg);
	};

	const { mutate, error, isLoading } = useMutation({
		mutationFn: ({
			payload,
			id,
			type,
		}: {
			payload: IUpdateUserClientInput;
			id: string;
			type: 'delete' | 'update';
		}) => {
			if (type === 'delete') {
				return updateStatus(payload, id);
			}
			return editClientUser(payload, id);
		},
		onError: handleError,
		onSuccess: () => {
			refetch!();
			showSuccessMessage('User has been successfully edited!');
		},
	});
	return { mutate, error, isLoading };
};

export default useMutateEditClientUser;
