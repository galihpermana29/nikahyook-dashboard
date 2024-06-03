import ErrorBoundary from '@/shared/view/container/error-boundary/ErrorBoundary';
import LoadingHandler from '@/shared/view/container/loading/Loading';
import PageTitle from '@/shared/view/presentations/page-title/PageTitle';
import { useForm } from 'antd/es/form/Form';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import FormCreation from '../../presentations/PageForm/FormCreation';
import useMutateCreateCuratorials from '../../../repositories/useCreateCuratorial';
import ProductModal from '../../presentations/Modal/ProductModal';
import { Modal } from 'antd';
import useModalReducer from '../../../usecase/useModalReducer';
import InspirationModal from '../../presentations/Modal/InspirationModal';
import CuratorialModalFooter from '../../presentations/CuratorialModalFooter';

const CuratorialCreate = () => {
  const [form] = useForm();

  const navigate = useNavigate();

  const { mutate: mutateEdit, error, isLoading } = useMutateCreateCuratorials();
  const { openModal, closeModal, modalState } = useModalReducer();

  const modalType = {
    product: (
      <ProductModal
        form={form}
        fieldName="products"
        footer={
          <CuratorialModalFooter
            itemCount={form.getFieldValue('products')?.length}
            secondaryText="Cancel"
            secondaryProps={{
              onClick: () => closeModal!(),
            }}
            primaryText="Add"
            primaryProps={{ type: 'submit' }}
          />
        }
      />
    ),
    inspiration: (
      <InspirationModal
        form={form}
        fieldName="inspirations"
        footer={
          <CuratorialModalFooter
            itemCount={form.getFieldValue('inspirations')?.length}
            secondaryText="Cancel"
            secondaryProps={{
              onClick: () => closeModal!(),
            }}
            primaryText="Add"
            primaryProps={{ type: 'submit' }}
          />
        }
      />
    ),
  };

  return (
    <ErrorBoundary
      error={error as AxiosError}
      refetch={() => {
        return;
      }}>
      <Modal
        title={<div className="capitalize">{`Search ${modalState?.type}`}</div>}
        open={modalState?.isOpen}
        footer={null}
        onCancel={closeModal}>
        {modalType[modalState!.type]}
      </Modal>

      <div className="bg-white">
        <PageTitle title="Create Curatorial" withArrow={true} />
        <div className="p-[20px]">
          <LoadingHandler isLoading={isLoading} fullscreen={true}>
            <FormCreation
              form={form}
              openModal={openModal}
              handleMutate={mutateEdit}
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

export default CuratorialCreate;
