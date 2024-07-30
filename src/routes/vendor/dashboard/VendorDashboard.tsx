import { Form, Modal } from 'antd';
import LoadingHandler from '@/shared/view/container/loading/Loading';
import useMutateEditVendorUser from '@/routes/admin/vendor-management/vendor-user-management/repositories/useUpdateVendorUser';
import useQueryVendorUserDetail from '@/routes/admin/vendor-management/vendor-user-management/repositories/useGetDetailVendorUser';
import useMutateEditPassword from '@/shared/repositories/useUpdatePassword';
import FormChangePassword from '@/shared/view/presentations/modal/ChangePasswordModal';
import FormFooter from '@/shared/view/presentations/form-footer/FormFooter';
import ErrorBoundary from '@/shared/view/container/error-boundary/ErrorBoundary';
import type { AxiosError } from 'axios';
import useModalReducer from '@/shared/usecase/useModalReducer';
import { PageFormEdit } from './view/presentations/Form/PageFormEdit';
import type { ILoginData } from '@/shared/models/userServicesInterface';
import profileCover from '@/assets/vendor-profile-cover.jpeg';
import {
  IVendorLocation,
  initialState,
} from '@/routes/admin/vendor-management/vendor-user-management/view/container/Create/VendorUserCreate';
import { useState } from 'react';
import useQueryProvince from '@/routes/admin/vendor-management/vendor-user-management/repositories/useGetAllProvince';
import useQueryCity from '@/routes/admin/vendor-management/vendor-user-management/repositories/useGetAllCity';
import useQueryDistrict from '@/routes/admin/vendor-management/vendor-user-management/repositories/useGetAllDistrict';
import useQueryVillage from '@/routes/admin/vendor-management/vendor-user-management/repositories/useGetAllVillage';

export default function VendorProfileContainer() {
  const [form] = Form.useForm();
  const [formModal] = Form.useForm();

  const { modalState, closeModal, openModal } = useModalReducer(formModal);
  const [locationState, setLocationState] =
    useState<IVendorLocation>(initialState);

  const userDetail = localStorage ? localStorage.getItem('admin') : null;

  const parsedUserDetail = userDetail
    ? (JSON.parse(userDetail) as ILoginData)
    : undefined;

  const userId = parsedUserDetail ? parsedUserDetail.user_id : '';

  const {
    isLoading: loadingGetDetail,
    refetch,
    error,
    initialDetailData,
  } = useQueryVendorUserDetail(userId as string, form, setLocationState);

  const { mutate: mutateEdit } = useMutateEditVendorUser(
    refetch,
    locationState
  );

  const { mutate: mutateEditPassword } = useMutateEditPassword(
    closeModal,
    refetch
  );

  const { result: provinceTypes, error: errorEmsifa } = useQueryProvince();
  const { result: cityTypes } = useQueryCity(locationState.province?.value);
  const { result: districtTypes } = useQueryDistrict(locationState.city?.value);
  const { result: villageId } = useQueryVillage(locationState.district?.value);

  const modalType = {
    password: (
      <FormChangePassword
        id={modalState?.id}
        form={formModal}
        handleMutate={mutateEditPassword}
        footer={
          <FormFooter
            secondaryText="Cancel"
            secondaryProps={{
              onClick: () => closeModal!(),
            }}
            primaryText="Save"
            primaryProps={{ type: 'submit' }}
          />
        }
      />
    ),
  };

  return (
    <div>
      <ErrorBoundary
        error={(error || errorEmsifa) as AxiosError}
        refetch={refetch}>
        <Modal
          title={
            <div className="capitalize">
              {modalState?.type === 'password'
                ? 'Change Password'
                : `${modalState?.type} User`}
            </div>
          }
          open={modalState?.isOpen}
          footer={null}
          onCancel={closeModal}>
          {modalType[modalState!.type]}
        </Modal>

        <div className="bg-white relative">
          <div className="bg-ny-primary-500 h-[12.5rem] w-full absolute top-0 rounded-xl overflow-hidden bg-bottom">
            <img src={profileCover} className="bg-ny-primary-500 bg-cover" />
          </div>

          <div className="p-[20px]">
            <LoadingHandler isLoading={loadingGetDetail} fullscreen={true}>
              <PageFormEdit
                onLocationChange={setLocationState}
                dynamicSelectOptions={{
                  provinceTypes: provinceTypes ?? [],
                  cityTypes: cityTypes ?? [],
                  districtTypes: districtTypes ?? [],
                  villageTypes: villageId ?? [],
                }}
                form={form}
                onSave={mutateEdit}
                onChangePasswordClick={() => openModal!('password', userId)}
                onCancel={() => form.setFieldsValue(initialDetailData)}
                id={userId as string}
                disabled={false}
              />
            </LoadingHandler>
          </div>
        </div>
      </ErrorBoundary>
    </div>
  );
}
