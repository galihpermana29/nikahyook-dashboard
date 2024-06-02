import ErrorBoundary from '@/shared/view/container/error-boundary/ErrorBoundary';
import LoadingHandler from '@/shared/view/container/loading/Loading';
import PageTitle from '@/shared/view/presentations/page-title/PageTitle';
import { useForm } from 'antd/es/form/Form';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import FormCreation from '../../presentations/PageForm/FormCreation';
import useMutateCreateCuratorials from '../../../repositories/useCreateCuratorial';

const CuratorialCreate = () => {
  const [form] = useForm();

  const navigate = useNavigate();

  const { mutate: mutateEdit, error, isLoading } = useMutateCreateCuratorials();

  return (
    <ErrorBoundary
      error={error as AxiosError}
      refetch={() => {
        return;
      }}>
      <div className="bg-white">
        <PageTitle title="Create Curatorial" withArrow={true} />
        <div className="p-[20px]">
          <LoadingHandler isLoading={isLoading} fullscreen={true}>
            <FormCreation
              form={form}
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
