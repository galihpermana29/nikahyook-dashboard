import ErrorBoundary from '@/shared/view/container/error-boundary/ErrorBoundary';
import PageTitle from '@/shared/view/presentations/page-title/PageTitle';
import PageFormEdit from '../../presentations/PageForm/PageFormEdit';
import { useForm } from 'antd/es/form/Form';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingHandler from '@/shared/view/container/loading/Loading';
import { AxiosError } from 'axios';
import useQueryVendorContentsDetail from '@/routes/admin/vendor-management/vendor-content/repositories/useGetDetailContent';
import useMutateEditVendorContent from '@/routes/admin/vendor-management/vendor-content/repositories/useUpdateContent';
import useQueryProductTypes from '@/routes/admin/vendor-management/vendor-content/repositories/useGetAllProductTypes';
import useQueryTags from '@/routes/admin/vendor-management/vendor-content/repositories/useGetAllTags';
import useQueryProvince from '@/routes/admin/vendor-management/vendor-user-management/repositories/useGetAllProvince';
import useQueryCity from '@/routes/admin/vendor-management/vendor-user-management/repositories/useGetAllCity';
import useQueryDistrict from '@/routes/admin/vendor-management/vendor-user-management/repositories/useGetAllDistrict';
import useQueryVillage from '@/routes/admin/vendor-management/vendor-user-management/repositories/useGetAllVillage';
import { useState } from 'react';
import {
  IVendorLocation,
  initialState,
} from '@/routes/admin/vendor-management/vendor-user-management/view/container/Create/VendorUserCreate';

const VendorProductDetailContainer = () => {
  const [form] = useForm();
  const navigate = useNavigate();
  const { id } = useParams();

  const [locationState, setLocationState] =
    useState<IVendorLocation>(initialState);

  const [activeCoverage, setActiveCoverage] = useState<any>({
    province: [],
    city: [],
  });

  const [coverageState, setCoverageState] = useState<any[]>([]);

  const {
    isLoading: loadingGetDetail,
    refetch,
    error,
  } = useQueryVendorContentsDetail(
    id as string,
    form,
    setLocationState,
    setActiveCoverage
  );

  const { result: resultProductTypes, error: errorProductTypes } =
    useQueryProductTypes();

  const { result: resultTags, error: errorTags } = useQueryTags();
  const { mutate: mutateEdit } = useMutateEditVendorContent(
    refetch,
    locationState,
    coverageState
  );

  const { result: provinceTypes, error: errorEmsifa } = useQueryProvince();
  const { result: cityTypes } = useQueryCity(locationState.province?.value);
  const { result: cityCoverageTypes } = useQueryCity(
    activeCoverage.province.length > 0
      ? activeCoverage.province?.[activeCoverage.province.length - 1].value
      : null
  );
  const { result: districtTypes } = useQueryDistrict(locationState.city?.value);
  const { result: villageId } = useQueryVillage(locationState.district?.value);

  return (
    <div>
      <ErrorBoundary
        error={
          (error || errorTags || errorProductTypes || errorEmsifa) as AxiosError
        }
        refetch={refetch}>
        <PageTitle title="Edit Vendor Product" withArrow={true} />
        <div className="p-[20px]">
          <LoadingHandler isLoading={loadingGetDetail} fullscreen={true}>
            <PageFormEdit
              onActiveCoverageChange={setActiveCoverage}
              onLocationChange={setLocationState}
              setCoverageState={setCoverageState}
              activeCoverage={activeCoverage}
              dynamicSelectOptions={{
                tags: resultTags ? resultTags!.selectOptions! : [],
                productTypes: resultProductTypes
                  ? resultProductTypes!.selectOptions!
                  : [],
                provinceTypes: provinceTypes ?? [],
                cityTypes: cityTypes ?? [],
                districtTypes: districtTypes ?? [],
                villageTypes: villageId ?? [],
                cityCoverageTypes: cityCoverageTypes ?? [],
              }}
              disabled={true}
              id={id as string}
              form={form}
              onSave={mutateEdit}
              onCancel={() => navigate(-1)}
            />
          </LoadingHandler>
        </div>
      </ErrorBoundary>
    </div>
  );
};

export default VendorProductDetailContainer;
