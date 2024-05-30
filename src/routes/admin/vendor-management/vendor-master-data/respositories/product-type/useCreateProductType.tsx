import { ICreateProductTypePayloadRoot } from "@/shared/models/productServicesInterface";
import { DashboardProductAPI } from "@/shared/repositories/productService";
import useErrorAxios from "@/shared/usecase/useErrorAxios";
import useSuccessAxios from "@/shared/usecase/useSuccessAxios";
import { AxiosError } from "axios";
import { useMutation } from "react-query";

const useMutateCreateProductType = (
    closeModal?: () => void,
    refetch?: () => void
) => {

    const { generateErrorMsg, showPopError } = useErrorAxios();
    const { showSuccessMessage } = useSuccessAxios();

    const createProductType = async (payload: ICreateProductTypePayloadRoot) => {
        const data = await DashboardProductAPI.createProductType(payload);
        return data;
    };

    const handleError = (error: AxiosError) => {
        const msg = generateErrorMsg(error);
        showPopError(msg);
    };

    const { mutate, error, isLoading } = useMutation({
        mutationFn: (payload: ICreateProductTypePayloadRoot) => createProductType(payload),
        onError: handleError,
        onSuccess: () => {
            closeModal!();
            refetch!();
            showSuccessMessage('Product Type successfully added!');
        },
    });

    return { mutate, error, isLoading };
}

export default useMutateCreateProductType;