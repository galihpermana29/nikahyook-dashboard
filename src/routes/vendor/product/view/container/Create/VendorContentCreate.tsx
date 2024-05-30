import LoadingHandler from '@/shared/view/container/loading/Loading';
import TableHeaderTitle from '@/shared/view/presentations/table-header-title/TableHeaderTitle';
import PageFormCreate from '../../presentations/PageForm/PageFormCreate';
import useCreateProduct from '../../../repositories/useCreateProduct';
import { useForm } from 'antd/es/form/Form';
import { useNavigate } from 'react-router-dom';
import ErrorBoundary from '@/shared/view/container/error-boundary/ErrorBoundary';
import { AxiosError } from 'axios';
import useQueryProductTypes from '@/routes/admin/vendor-management/vendor-content/repositories/useGetAllProductTypes';
import useQueryTags from '@/routes/admin/vendor-management/vendor-content/repositories/useGetAllTags';

const VendorProductCreateContainer = () => {
  const { mutate, isLoading } = useCreateProduct();
  const [form] = useForm();

  const userId = JSON.parse(localStorage.getItem('admin')!)?.user_id;

  const navigate = useNavigate();

  const { result: resultProductTypes, error: errorProductTypes } =
    useQueryProductTypes();
  const { result: resultTags, error: errorTags, refetch } = useQueryTags();

  return (
    <ErrorBoundary
      error={(errorTags || errorProductTypes) as AxiosError}
      refetch={refetch}>
      <TableHeaderTitle title="Create Vendor Product" withArrow={true} />
      <div className="p-[20px]">
        <LoadingHandler isLoading={isLoading} fullscreen={true}>
          <PageFormCreate
            dynamicSelectOptions={{
              tags: resultTags ? resultTags!.selectOptions! : [],
              productTypes: resultProductTypes
                ? resultProductTypes!.selectOptions!
                : [],
            }}
            disabled={false}
            id={userId as string}
            form={form}
            onSave={mutate}
            onCancel={() => navigate(-1)}
          />
        </LoadingHandler>
      </div>
    </ErrorBoundary>
  );
};

export default VendorProductCreateContainer;
