import ErrorBoundary from '@/shared/view/container/error-boundary/ErrorBoundary';
import LoadingHandler from '@/shared/view/container/loading/Loading';
import PageTitle from '@/shared/view/presentations/page-title/PageTitle';
import { useForm } from 'antd/es/form/Form';
import { AxiosError } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import useMutateCreateCuratorials from '../../../repositories/useCreateCuratorial';
import FormEdit from '../../presentations/PageForm/FormEdit';
import useQueryCuratorialDetail from '../../../repositories/useGetDetailCuratorial';
import { Modal } from 'antd';
import ProductModal from '../../presentations/Modal/ProductModal';
import FormFooter from '@/shared/view/presentations/form-footer/FormFooter';
import InspirationModal from '../../presentations/Modal/InspirationModal';
import useModalReducer from '../../../usecase/useModalReducer';

const CuratorialEdit = () => {
  const [form] = useForm();
  const [formModal] = useForm();

  const navigate = useNavigate();
  const { id } = useParams();

  const { mutate: mutateEdit, error: errorCreate } =
    useMutateCreateCuratorials();

  const {
    error: errorFetch,
    isLoading,
    refetch,
  } = useQueryCuratorialDetail(id ?? '', form);

  const { openModal, closeModal, modalState } = useModalReducer(formModal);

  const modalType = {
    product: (
      <ProductModal
        form={formModal}
        footer={
          <FormFooter
            secondaryText="Cancel"
            secondaryProps={{
              onClick: () => closeModal!(),
            }}
            primaryText="Create"
            primaryProps={{ type: 'submit' }}
          />
        }
      />
    ),
    inspiration: (
      <InspirationModal
        form={formModal}
        footer={
          <FormFooter
            secondaryText="Cancel"
            secondaryProps={{
              onClick: () => closeModal!(),
            }}
            primaryText="Create"
            primaryProps={{ type: 'submit' }}
          />
        }
      />
    ),
  };

  return (
    <ErrorBoundary
      error={(errorCreate as AxiosError) || (errorFetch as AxiosError)}
      refetch={refetch}>
      <Modal
        title={<div className="capitalize">{`Search ${modalState?.type}`}</div>}
        open={modalState?.isOpen}
        footer={null}
        onCancel={closeModal}>
        {modalType[modalState!.type]}
      </Modal>

      <div className="bg-white">
        <PageTitle title="Edit Curatorial" withArrow={true} />
        <div className="p-[20px]">
          <LoadingHandler isLoading={isLoading} fullscreen={true}>
            <FormEdit
              openModal={openModal}
              form={form}
              handleMutate={mutateEdit}
              disabled={false}
              onCancel={() => {
                navigate(-1);
              }}
            />
          </LoadingHandler>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default CuratorialEdit;
