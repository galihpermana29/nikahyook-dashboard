/* eslint-disable @typescript-eslint/no-explicit-any */
import LoadingHandler from '@/shared/view/container/loading/Loading';
import PageTitle from '@/shared/view/presentations/page-title/PageTitle';
import PageFormCreate from '../../presentations/PageForm/PageFormCreate';
import useCreateProduct from '../../../repositories/useCreateProduct';
import { useForm } from 'antd/es/form/Form';
import { useNavigate } from 'react-router-dom';
import ErrorBoundary from '@/shared/view/container/error-boundary/ErrorBoundary';
import { AxiosError } from 'axios';
import useQueryProductTypes from '@/routes/admin/vendor-management/vendor-content/repositories/useGetAllProductTypes';
import useQueryTags from '@/routes/admin/vendor-management/vendor-content/repositories/useGetAllTags';
import useQueryProvince from '@/routes/admin/vendor-management/vendor-user-management/repositories/useGetAllProvince';
import useQueryCity from '@/routes/admin/vendor-management/vendor-user-management/repositories/useGetAllCity';
import useQueryDistrict from '@/routes/admin/vendor-management/vendor-user-management/repositories/useGetAllDistrict';
import useQueryVillage from '@/routes/admin/vendor-management/vendor-user-management/repositories/useGetAllVillage';
import {
  IVendorLocation,
  initialState,
} from '@/routes/admin/vendor-management/vendor-user-management/view/container/Create/VendorUserCreate';
import { useState } from 'react';
import useSetInitialLocationForProduct from '../../../usecase/useSetInitialLocationForProduct';
import useQueryDetailUser from '@/shared/view/container/general-layout/repositories/useQueryDetailUser';

const VendorProductCreateContainer = () => {
  const [form] = useForm();
  const navigate = useNavigate();

  const userId = JSON.parse(localStorage.getItem('admin')!)?.user_id;

  const [locationState, setLocationState] =
    useState<IVendorLocation>(initialState);

  const [activeCoverage, setActiveCoverage] = useState<any>({
    province: [],
    city: [],
  });
  const [coverageState, setCoverageState] = useState([]);

  const { setTheSameLoc, useTheSameLoc } = useSetInitialLocationForProduct(
    userId as string,
    setLocationState,
    form
  );

  const { data: vendorDetail, isLoading: vendorDetailLoading } =
    useQueryDetailUser(userId);
  const { mutate, isLoading } = useCreateProduct(
    locationState,
    coverageState,
    vendorDetail?.name ?? ''
  );

  const { result: resultProductTypes, error: errorProductTypes } =
    useQueryProductTypes();
  const { result: resultTags, error: errorTags, refetch } = useQueryTags();

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
    <ErrorBoundary
      error={(errorTags || errorProductTypes || errorEmsifa) as AxiosError}
      refetch={refetch}>
      <PageTitle title="Create Vendor Product" withArrow={true} />
      <div className="p-[20px]">
        <LoadingHandler
          isLoading={isLoading || vendorDetailLoading}
          fullscreen={true}>
          <PageFormCreate
            onSetLocationChange={setTheSameLoc}
            useTheSameLoc={useTheSameLoc}
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
            disabled={false}
            id={userId as string}
            form={form}
            onSave={mutate}
            onCancel={() => navigate(-1)}
          />
        </LoadingHandler>
      </div>
    </ErrorBoundary>
  );
};

export default VendorProductCreateContainer;
