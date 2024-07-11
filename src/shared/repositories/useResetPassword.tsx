import useErrorAxios from '@/shared/usecase/useErrorAxios';
import useSuccessAxios from '@/shared/usecase/useSuccessAxios';
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';
import {
    IResetPasswordPayloadRoot,
} from '../models/userServicesInterface';
import { DashboardUserAPI } from './userServices';

const useMutateResetPassword = (
	closeModal?: () => void,
	refetch?: () => void
) => {
	const { generateErrorMsg, showPopError } = useErrorAxios();
	const { showSuccessMessage } = useSuccessAxios();

	const resetPassword = async (
		new_password: string,
		id: string
	) => {
		const newPayload: IResetPasswordPayloadRoot = {
			user_id: id,
            new_password: new_password
		};

		const data = await DashboardUserAPI.resetUserPassword(newPayload);
		return data;
	};

	const handleError = (error: AxiosError) => {
		const msg = generateErrorMsg(error);
		showPopError(msg);
	};

	const { mutate, error, isLoading } = useMutation({
		mutationFn: ({
			new_password,
			id,
		}: {
			new_password: string;
			id: string;
		}) => {
			return resetPassword(new_password, id);
		},
		onError: handleError,
		onSuccess: () => {
			closeModal!();
			refetch!();
			showSuccessMessage('Password successfully changed!');
		},
	});
	return { mutate, error, isLoading };
};

export default useMutateResetPassword;
