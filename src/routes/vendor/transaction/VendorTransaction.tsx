import {
  ICreateUserPayloadRoot,
  IDetailVendorUser,
} from '@/shared/models/userServicesInterface';
import useMutateCreateNotification from '@/shared/repositories/useCreateNotification';
import ErrorBoundary from '@/shared/view/container/error-boundary/ErrorBoundary';
import useQueryDetailUser from '@/shared/view/container/general-layout/repositories/useQueryDetailUser';
import DashboardTable from '@/shared/view/presentations/dashboard-table/DashboardTable';
import PageFilter from '@/shared/view/presentations/page-filter/PageFilter';
import PageTitle from '@/shared/view/presentations/page-title/PageTitle';
import { Form, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import useQueryVendorTransaction from './repositories/useGetAllTransaction';
import useMutateUpdateVendorTransaction from './repositories/useUpdateTransactionStatus';
import useGenerateColumnVendorTransaction from './usecase/useGenerateColumn';

function VendorTransactionContainer() {
  const [form] = useForm();

  const navigate = useNavigate();

  const userId = JSON.parse(localStorage.getItem('admin')!)?.user_id;
  const { data: vendorDetail, isLoading: vendorDetailLoading } =
    useQueryDetailUser(userId);

  const {
    result,
    error,
    isLoading,
    refetch,
    setQueryVendorTransaction,
    queryVendorTransaction,
    handleFilter,
    clearFilter,
  } = useQueryVendorTransaction(form);

  const { mutate: mutateTransaction } = useMutateUpdateVendorTransaction();
  const { mutate: mutateNotification } = useMutateCreateNotification();

  const { columns } = useGenerateColumnVendorTransaction(
    refetch,
    navigate,
    mutateTransaction,
    mutateNotification,
    vendorDetail as ICreateUserPayloadRoot<IDetailVendorUser>
  );

  return (
    <ErrorBoundary error={error as AxiosError}>
      <PageTitle title="Transaction" />
      <DashboardTable
        columns={columns}
        onPaginationChanges={setQueryVendorTransaction}
        loading={isLoading || vendorDetailLoading}
        data={result?.data}
        metadata={result?.meta_data}
        filterComponents={
          <PageFilter
            form={form}
            query={queryVendorTransaction}
            onApplyFilter={handleFilter}
            onClearFilter={clearFilter}
            onSearch={setQueryVendorTransaction}
            filterComponents={
              <Form.Item
                name={'status'}
                label="Status"
                initialValue={'default'}
                className="my-[10px]">
                <Select
                  className="h-[35px]"
                  options={[
                    { value: 'default', label: 'All' },
                    {
                      value: 'waiting for approval',
                      label: 'Waiting for Approval',
                    },
                    {
                      value: 'waiting for payment',
                      label: 'Waiting for Payment',
                    },
                    {
                      value: 'payment in review',
                      label: 'Payment in Review',
                    },
                    {
                      value: 'payment done',
                      label: 'Payment Done',
                    },
                    {
                      value: 'order failed',
                      label: 'Order Failed',
                    },
                  ]}
                />
              </Form.Item>
            }
          />
        }
      />
    </ErrorBoundary>
  );
}

export default VendorTransactionContainer;
