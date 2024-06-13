import ErrorBoundary from '@/shared/view/container/error-boundary/ErrorBoundary';
import LoadingHandler from '@/shared/view/container/loading/Loading';
import PageTitle from '@/shared/view/presentations/page-title/PageTitle';
import { useForm } from 'antd/es/form/Form';
import { useNavigate, useParams } from 'react-router-dom';
import useQueryVendorUserDetail from '../../../repositories/useGetDetailVendorUser';
import useMutateEditVendorUser from '../../../repositories/useUpdateVendorUser';
import { PageFormEdit } from '../../presentations/PageForm/PageFormEdit';
import { AxiosError } from 'axios';
import useModalReducer from '@/shared/usecase/useModalReducer';
import FormChangePassword from '@/shared/view/presentations/modal/ChangePasswordModal';
import { Modal } from 'antd';
import useMutateEditPassword from '@/shared/repositories/useUpdatePassword';
import FormFooter from '@/shared/view/presentations/form-footer/FormFooter';
import useQueryVendorTypes from '../../../repositories/useGetVendorTypes';
import { IVendorLocation, initialState } from '../Create/VendorUserCreate';
import { useState } from 'react';
import useQueryProvince from '../../../repositories/useGetAllProvince';
import useQueryCity from '../../../repositories/useGetAllCity';
import useQueryDistrict from '../../../repositories/useGetAllDistrict';
import useQueryVillage from '../../../repositories/useGetAllVillage';

const VendorUserEditContainer = () => {
  const [form] = useForm();
  const [formModal] = useForm();

  const { modalState, closeModal, openModal } = useModalReducer(formModal);

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

        <div className="bg-white">
          <PageTitle title="Edit Vendor User" withArrow={true} />
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
                onChangePasswordClick={() => openModal!('password', id)}
                onCancel={() => {
                  navigate(-1);
                }}
                id={id as string}
                disabled={false}
              />
            </LoadingHandler>
          </div>
        </div>
      </ErrorBoundary>
    </div>
  );
};

export default VendorUserEditContainer;
