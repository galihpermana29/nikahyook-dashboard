import ErrorBoundary from '@/shared/view/container/error-boundary/ErrorBoundary';
import PageTitle from '@/shared/view/presentations/page-title/PageTitle';
import { useForm } from 'antd/es/form/Form';
import { useNavigate } from 'react-router-dom';
import { PageFormCreate } from '../../presentations/PageForm/PageFormCreate';
import useMutateCreateVendorUser from '../../../repositories/useCreateVendorUser';
import { AxiosError } from 'axios';
import useQueryVendorTypes from '../../../repositories/useGetVendorTypes';
import useQueryProvince from '../../../repositories/useGetAllProvince';
import { useState } from 'react';
import useQueryCity from '../../../repositories/useGetAllCity';
import useQueryDistrict from '../../../repositories/useGetAllDistrict';
import useQueryVillage from '../../../repositories/useGetAllVillage';
import { TGeneralSelectOptions } from '@/shared/models/generalInterfaces';

export interface IVendorLocation {
  province: TGeneralSelectOptions;
  city: TGeneralSelectOptions;
  district: TGeneralSelectOptions;
  village: TGeneralSelectOptions;
  postal_code?: number;
}

export const initialState = {
  province: {
    value: null,
    label: null,
  },
  city: {
    value: null,
    label: null,
  },
  district: {
    value: null,
    label: null,
  },
  village: {
    value: null,
    label: null,
  },
};

const VendorUserCreateContainer = () => {
  const [form] = useForm();
  const [locationState, setLocationState] =
    useState<IVendorLocation>(initialState);
  const navigate = useNavigate();

  const { mutate: mutateCreate, error } =
    useMutateCreateVendorUser(locationState);
  const { result: vendorTypes } = useQueryVendorTypes();

  const {
    result: provinceTypes,
    error: errorEmsifa,
    refetch,
  } = useQueryProvince();
  const { result: cityTypes } = useQueryCity(locationState.province?.value);
  const { result: districtTypes } = useQueryDistrict(locationState.city?.value);
  const { result: villageId } = useQueryVillage(locationState.district?.value);
  
  return (
    <div>
      <ErrorBoundary
        error={(error || errorEmsifa) as AxiosError}
        refetch={refetch}>
        <div className="bg-white">
          <PageTitle title="Create User" withArrow={true} />
          <div className="p-[20px]">
            <PageFormCreate
              onLocationChange={setLocationState}
              dynamicSelectOptions={{
                vendorTypes: vendorTypes ? vendorTypes.data : [],
                provinceTypes: provinceTypes ?? [],
                cityTypes: cityTypes ?? [],
                districtTypes: districtTypes ?? [],
                villageTypes: villageId ?? [],
              }}
              form={form}
              onSave={mutateCreate}
              onCancel={() => {
                form.resetFields();
                navigate(-1);
              }}
            />
          </div>
        </div>
      </ErrorBoundary>
    </div>
  );
};

export default VendorUserCreateContainer;
