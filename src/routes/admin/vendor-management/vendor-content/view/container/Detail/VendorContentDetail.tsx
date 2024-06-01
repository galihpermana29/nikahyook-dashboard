import ErrorBoundary from '@/shared/view/container/error-boundary/ErrorBoundary';
import PageTitle from '@/shared/view/presentations/page-title/PageTitle';
import PageFormEdit from '../../presentations/PageForm/PageFormEdit';
import { useForm } from 'antd/es/form/Form';
import useQueryVendorContentsDetail from '../../../repositories/useGetDetailContent';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingHandler from '@/shared/view/container/loading/Loading';
import useMutateEditVendorContent from '../../../repositories/useUpdateContent';
import { AxiosError } from 'axios';
import useQueryTags from '../../../repositories/useGetAllTags';
import useQueryProductTypes from '../../../repositories/useGetAllProductTypes';

const VendorContentDetailContainer = () => {
  const [form] = useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    isLoading: loadingGetDetail,
    refetch,
    error,
  } = useQueryVendorContentsDetail(id as string, form);

  const { result: resultProductTypes, error: errorProductTypes } =
    useQueryProductTypes();
  const { result: resultTags, error: errorTags } = useQueryTags();

  const { mutate: mutateEdit } = useMutateEditVendorContent(refetch);

  return (
    <div>
      <ErrorBoundary
        error={(error || errorTags || errorProductTypes) as AxiosError}
        refetch={refetch}>
        <PageTitle title="Detail Vendor Product" withArrow={true} />
        <div className="p-[20px]">
          <LoadingHandler isLoading={loadingGetDetail} fullscreen={true}>
            <PageFormEdit
              dynamicSelectOptions={{
                tags: resultTags ? resultTags!.selectOptions! : [],
                productTypes: resultProductTypes
                  ? resultProductTypes!.selectOptions!
                  : [],
              }}
              disabled={true}
              id={id as string}
              form={form}
              onSave={mutateEdit}
              onCancel={() => navigate(-1)}
            />
          </LoadingHandler>
        </div>
      </ErrorBoundary>
    </div>
  );
};

export default VendorContentDetailContainer;
