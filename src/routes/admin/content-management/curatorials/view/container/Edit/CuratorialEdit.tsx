import ErrorBoundary from '@/shared/view/container/error-boundary/ErrorBoundary';
import LoadingHandler from '@/shared/view/container/loading/Loading';
import PageTitle from '@/shared/view/presentations/page-title/PageTitle';
import { useForm } from 'antd/es/form/Form';
import { AxiosError } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import FormEdit from '../../presentations/PageForm/FormEdit';
import useQueryCuratorialDetail from '../../../repositories/useGetDetailCuratorial';
import { Modal } from 'antd';
import useModalReducer from '../../../usecase/useModalReducer';
import useGetCuratorialModalType from '../../../repositories/useGetCuratorialModalType';
import useMutateUpdateCuratorial from '../../../repositories/useUpdateCuratorial';

const CuratorialEdit = () => {
  const [form] = useForm();
  const [filterForm] = useForm();

  const navigate = useNavigate();
  const { id } = useParams();

  const {
    error: errorFetch,
    isLoading,
    refetch,
  } = useQueryCuratorialDetail(id ?? '', form);

  const { mutate: mutateEdit, error: errorCreate } =
    useMutateUpdateCuratorial(refetch);

  const { openModal, closeModal, modalState } = useModalReducer();

  const modalType = useGetCuratorialModalType({ filterForm, form, closeModal });

  return (
    <ErrorBoundary
      error={(errorCreate as AxiosError) || (errorFetch as AxiosError)}
      refetch={refetch}>
      <Modal
        width={'90%'}
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
              handleMutate={(payload) =>
                mutateEdit({ payload, id: parseInt(id ?? '') })
              }
              id={id ?? ''}
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
