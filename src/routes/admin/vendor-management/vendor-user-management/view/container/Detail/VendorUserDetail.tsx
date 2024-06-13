import ErrorBoundary from '@/shared/view/container/error-boundary/ErrorBoundary';
import LoadingHandler from '@/shared/view/container/loading/Loading';
import PageTitle from '@/shared/view/presentations/page-title/PageTitle';
import { useForm } from 'antd/es/form/Form';
import { useNavigate, useParams } from 'react-router-dom';
import useQueryVendorUserDetail from '../../../repositories/useGetDetailVendorUser';
import useMutateEditVendorUser from '../../../repositories/useUpdateVendorUser';
import { PageFormEdit } from '../../presentations/PageForm/PageFormEdit';
import { AxiosError } from 'axios';
import useQueryVendorTypes from '../../../repositories/useGetVendorTypes';
import { useState } from 'react';
import { IVendorLocation, initialState } from '../Create/VendorUserCreate';
import useQueryProvince from '../../../repositories/useGetAllProvince';
import useQueryCity from '../../../repositories/useGetAllCity';
import useQueryDistrict from '../../../repositories/useGetAllDistrict';
import useQueryVillage from '../../../repositories/useGetAllVillage';

const VendorUserDetailContainer = () => {
  const [form] = useForm();

  const navigate = useNavigate();

  const { id } = useParams();
  const [locationState, setLocationState] =
    useState<IVendorLocation>(initialState);
  const {
    isLoading: loadingGetDetail,
    refetch,
    error,
  } = useQueryVendorUserDetail(id as string, form, setLocationState);

  const { mutate: mutateEdit } = useMutateEditVendorUser(
    refetch,
    locationState
  );
  const { result: vendorTypes } = useQueryVendorTypes();

  const { result: provinceTypes, error: errorEmsifa } = useQueryProvince();
  const { result: cityTypes } = useQueryCity(locationState.province?.value);
  const { result: districtTypes } = useQueryDistrict(locationState.city?.value);
  const { result: villageId } = useQueryVillage(locationState.district?.value);

  return (
    <div>
      <ErrorBoundary
        error={(error || errorEmsifa) as AxiosError}
        refetch={refetch}>
        <div className="bg-white">
          <PageTitle title="Vendor User Detail" withArrow={true} />
          <div className="p-[20px]">
            <LoadingHandler isLoading={loadingGetDetail} fullscreen={true}>
              <PageFormEdit
                onLocationChange={setLocationState}
                dynamicSelectOptions={{
                  vendorTypes: vendorTypes ? vendorTypes.data : [],
                  provinceTypes: provinceTypes ?? [],
                  cityTypes: cityTypes ?? [],
                  districtTypes: districtTypes ?? [],
                  villageTypes: villageId ?? [],
                }}
                form={form}
                onSave={mutateEdit}
                onCancel={() => {
                  navigate(-1);
                }}
                id={id as string}
                disabled={true}
                showEditButton
              />
            </LoadingHandler>
          </div>
        </div>
      </ErrorBoundary>
    </div>
  );
};

export default VendorUserDetailContainer;
