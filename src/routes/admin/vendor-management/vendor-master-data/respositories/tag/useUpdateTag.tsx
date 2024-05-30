import { IUpdateProductTagPayloadRoot } from '@/shared/models/productServicesInterface';
import { DashboardProductAPI } from '@/shared/repositories/productService';
import useErrorAxios from '@/shared/usecase/useErrorAxios';
import useSuccessAxios from '@/shared/usecase/useSuccessAxios';
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';

const useMutateEditProductTag = (
	closeModal?: () => void,
	refetch?: () => void
) => {
	const { generateErrorMsg, showPopError } = useErrorAxios();
	const { showSuccessMessage } = useSuccessAxios();

	const editProductTag = async (
		payload: IUpdateProductTagPayloadRoot,
		id: string
	) => {
		const data = await DashboardProductAPI.editProductTag(payload, id);
		return data;
	};

	const updateStatus = async (
		payload: IUpdateProductTagPayloadRoot,
		id: string
	) => {
		const data = await DashboardProductAPI.editProductTag(payload, id);
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
			payload: IUpdateProductTagPayloadRoot;
			id: string;
			type: 'delete' | 'update';
		}) => {
			if (type === 'delete') {
				return updateStatus(payload, id);
			}
			return editProductTag(payload, id);
		},
		onError: handleError,
		onSuccess: () => {
			closeModal!();
			refetch!();
			showSuccessMessage('Tag has been successfully edited!');
		},
	});
	return { mutate, error, isLoading };
};

export default useMutateEditProductTag;
