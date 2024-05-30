import { ICreateProductTagPayloadRoot } from '@/shared/models/productServicesInterface';
import { DashboardProductAPI } from '@/shared/repositories/productService';
import useErrorAxios from '@/shared/usecase/useErrorAxios';
import useSuccessAxios from '@/shared/usecase/useSuccessAxios';
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';

const useMutateCreateProductTag = (
	closeModal?: () => void,
	refetch?: () => void
) => {
	const { generateErrorMsg, showPopError } = useErrorAxios();
	const { showSuccessMessage } = useSuccessAxios();

	const createTag = async (payload: ICreateProductTagPayloadRoot) => {
		const data = await DashboardProductAPI.createProductTag(payload);
		return data;
	};

	const handleError = (error: AxiosError) => {
		const msg = generateErrorMsg(error);
		showPopError(msg);
	};

	const { mutate, error, isLoading } = useMutation({
		mutationFn: (payload: ICreateProductTagPayloadRoot) => createTag(payload),
		onError: handleError,
		onSuccess: () => {
			closeModal!();
			refetch!();
			showSuccessMessage('Tag successfully added!');
		},
	});
	return { mutate, error, isLoading };
};

export default useMutateCreateProductTag;
