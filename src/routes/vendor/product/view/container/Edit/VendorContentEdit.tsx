import ErrorBoundary from '@/shared/view/container/error-boundary/ErrorBoundary';
import TableHeaderTitle from '@/shared/view/presentations/table-header-title/TableHeaderTitle';
import PageFormEdit from '../../presentations/PageForm/PageFormEdit';
import { useForm } from 'antd/es/form/Form';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingHandler from '@/shared/view/container/loading/Loading';
import { AxiosError } from 'axios';
import useQueryVendorContentsDetail from '@/routes/admin/vendor-management/vendor-content/repositories/useGetDetailContent';
import useMutateEditVendorContent from '@/routes/admin/vendor-management/vendor-content/repositories/useUpdateContent';
import useQueryProductTypes from '@/routes/admin/vendor-management/vendor-content/repositories/useGetAllProductTypes';
import useQueryTags from '@/routes/admin/vendor-management/vendor-content/repositories/useGetAllTags';

const VendorProductEditContainer = () => {
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
        <TableHeaderTitle title="Edit Vendor Product" withArrow={true} />
        <div className="p-[20px]">
          <LoadingHandler isLoading={loadingGetDetail} fullscreen={true}>
            <PageFormEdit
              dynamicSelectOptions={{
                tags: resultTags ? resultTags!.selectOptions! : [],
                productTypes: resultProductTypes
                  ? resultProductTypes!.selectOptions!
                  : [],
              }}
              disabled={false}
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

export default VendorProductEditContainer;
