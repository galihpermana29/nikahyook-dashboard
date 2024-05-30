import ErrorBoundary from '@/shared/view/container/error-boundary/ErrorBoundary';
import LoadingHandler from '@/shared/view/container/loading/Loading';
import PageTitle from '@/shared/view/presentations/page-title/PageTitle';
import { useForm } from 'antd/es/form/Form';
import { AxiosError } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import useQueryClientUserDetail from '../../../repositories/useGetDetailUser';
import useMutateEditClientUser from '../../../repositories/useUpdateUser';
import { PageFormEdit } from '../../presentations/PageFormEdit';

const ClientUserDetailContainer = () => {
  const [form] = useForm();

  const navigate = useNavigate();

  const { id } = useParams();

  const {
    isLoading: loadingGetDetail,
    refetch,
    error,
  } = useQueryClientUserDetail(id as string, form);

  const { mutate: mutateEdit } = useMutateEditClientUser(refetch);

  return (
    <ErrorBoundary error={error as AxiosError} refetch={refetch}>
      <div className="bg-white">
        <PageTitle title="Edit User" withArrow={true} />
        <div className="p-[20px]">
          <LoadingHandler isLoading={loadingGetDetail} fullscreen={true}>
            <PageFormEdit
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
