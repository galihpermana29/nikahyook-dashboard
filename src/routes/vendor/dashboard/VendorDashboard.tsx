import { Form, Modal } from 'antd';
import LoadingHandler from '@/shared/view/container/loading/Loading';
import useMutateEditVendorUser from '@/routes/admin/vendor-management/vendor-user-management/repositories/useUpdateVendorUser';
import { useNavigate } from 'react-router-dom';
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

export default function VendorProfileContainer() {
  const [form] = Form.useForm();
  const [formModal] = Form.useForm();

  const { modalState, closeModal, openModal } = useModalReducer(formModal);

  const navigate = useNavigate();

  const userDetail = localStorage ? localStorage.getItem('admin') : null;

  const parsedUserDetail = userDetail
    ? (JSON.parse(userDetail) as ILoginData)
    : undefined;

  const userId = parsedUserDetail ? parsedUserDetail.user_id : '';

  const {
    isLoading: loadingGetDetail,
    refetch,
    error,
  } = useQueryVendorUserDetail(userId as string, form);
  const { mutate: mutateEdit } = useMutateEditVendorUser(refetch);

  const { mutate: mutateEditPassword } = useMutateEditPassword(
    closeModal,
    refetch
  );

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
      <ErrorBoundary error={error as AxiosError} refetch={refetch}>
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
                form={form}
                onSave={mutateEdit}
                onChangePasswordClick={() => openModal!('password', userId)}
                onCancel={() => {
                  navigate(-1);
                }}
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
