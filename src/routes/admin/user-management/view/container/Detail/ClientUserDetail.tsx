import ErrorBoundary from '@/shared/view/container/error-boundary/ErrorBoundary';
import LoadingHandler from '@/shared/view/container/loading/Loading';
import PageTitle from '@/shared/view/presentations/page-title/PageTitle';
import { useForm } from 'antd/es/form/Form';
import { AxiosError } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import useQueryClientUserDetail from '../../../repositories/useGetDetailUser';
import useMutateEditClientUser from '../../../repositories/useUpdateUser';
import { PageFormEdit } from '../../presentations/PageFormEdit';
import { useState } from 'react';
import {
  IVendorLocation,
  initialState,
} from '@/routes/admin/vendor-management/vendor-user-management/view/container/Create/VendorUserCreate';
import useQueryProvince from '@/routes/admin/vendor-management/vendor-user-management/repositories/useGetAllProvince';
import useQueryCity from '@/routes/admin/vendor-management/vendor-user-management/repositories/useGetAllCity';

const ClientUserDetailContainer = () => {
  const [form] = useForm();

  const navigate = useNavigate();

  const { id } = useParams();

  const [locationState, setLocationState] =
    useState<IVendorLocation>(initialState);

  const {
    isLoading: loadingGetDetail,
    refetch,
    error,
  } = useQueryClientUserDetail(id as string, form, setLocationState);

  const { mutate: mutateEdit } = useMutateEditClientUser(
    refetch,
    locationState
  );

  const { result: provinceTypes, error: errorEmsifa } = useQueryProvince();
  const { result: cityTypes } = useQueryCity(locationState.province?.value);

  return (
    <ErrorBoundary
      error={(error || errorEmsifa) as AxiosError}
      refetch={refetch}>
      <div className="bg-white">
        <PageTitle title="Edit User" withArrow={true} />
        <div className="p-[20px]">
          <LoadingHandler isLoading={loadingGetDetail} fullscreen={true}>
            <PageFormEdit
              onLocationChange={setLocationState}
              dynamicSelectOptions={{
                provinceTypes: provinceTypes ?? [],
                cityTypes: cityTypes ?? [],
                districtTypes: [],
                vendorTypes: [],
                villageTypes: [],
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
  );
};

export default ClientUserDetailContainer;
