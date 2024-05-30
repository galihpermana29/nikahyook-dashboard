import { DashboardProductAPI } from "@/shared/repositories/productService";
import { FormInstance } from "antd";
import { TGeneralFilter } from "@/shared/models/generalInterfaces";
import { useDebounce } from "@uidotdev/usehooks";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import useConvertQuery from "@/shared/usecase/useConvertQuery";
import useSuccessAxios from "@/shared/usecase/useSuccessAxios";

const useQueryProductTypes = (form: FormInstance<any>) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const keyword = searchParams.get('keyword');
    const status = searchParams.get('status');
    const limit = searchParams.get('limit');
    const page = searchParams.get('page');

    const initialFilterState: TGeneralFilter = {
        limit: 10,
        page: 1,
        keyword: '',
        status: 'default',
    };

    const [queryProductTypes, setQueryProductTypes] = useState<TGeneralFilter>({
        limit: limit ? parseInt(limit) : initialFilterState.limit,
        page: page ? parseInt(page) : initialFilterState.page,
        keyword: keyword ?? initialFilterState.keyword,
        status: status ?? initialFilterState.status,
    });

    const { objectToQueryParams } = useConvertQuery();
    const { addIndexToData } = useSuccessAxios();
    const queries = useDebounce(queryProductTypes, 1000);

    const getProductTypes = async () => {
        const queryParams = objectToQueryParams(queryProductTypes);
        setSearchParams(queryParams);

        const { data, meta_data } = await DashboardProductAPI.getAllProductTypes(
            queryParams
        );

        return { data: addIndexToData(data), meta_data };
    };

    const { data: result, error, isLoading, refetch } = useQuery({
        queryKey: ['vendor-product-type', { ...queries }],
        queryFn: getProductTypes,
    });

    const handleFilter = (value: any) => {
        for (const x in value) {
            if (value[x]) {
                setQueryProductTypes((val) => ({ ...val, [x]: value[x] }));
            }
        }
    };

    const clearFilter = () => {
        const clearFilterQuery = {
            ...initialFilterState,
            limit: queries.limit,
            page: queries.page,
        };
        form.setFieldsValue(clearFilterQuery);

        setQueryProductTypes(() => ({
            ...clearFilterQuery,
        }));
    };

    return {
        result,
        error,
        isLoading,
        refetch,
        setQueryProductTypes,
        queryProductTypes,
        handleFilter,
        clearFilter,
    };
}

export default useQueryProductTypes;