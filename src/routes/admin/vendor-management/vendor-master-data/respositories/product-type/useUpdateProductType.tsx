import { AxiosError } from "axios";
import { DashboardProductAPI } from "@/shared/repositories/productService";
import { IUpdateProductTypePayloadRoot } from "@/shared/models/productServicesInterface";
import { useMutation } from "react-query";
import useErrorAxios from "@/shared/usecase/useErrorAxios";
import useSuccessAxios from "@/shared/usecase/useSuccessAxios";

const useMutateEditProductType = (
    closeModal?: () => void,
    refetch?: () => void
) => {

    const { generateErrorMsg, showPopError } = useErrorAxios();
    const { showSuccessMessage } = useSuccessAxios();

    const editProductTag = async (
        payload: IUpdateProductTypePayloadRoot,
        id: string
    ) => {
        const data = await DashboardProductAPI.editProductType(payload, id);
        return data;
    };

    const updateStatus = async (
        payload: IUpdateProductTypePayloadRoot,
        id: string
    ) => {
        const data = await DashboardProductAPI.editProductType(payload, id);
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
            payload: IUpdateProductTypePayloadRoot;
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
            showSuccessMessage('Product Type has been successfully edited!');
        },
    });

    return { mutate, error, isLoading };
}

export default useMutateEditProductType;