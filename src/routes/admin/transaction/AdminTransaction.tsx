import ErrorBoundary from '@/shared/view/container/error-boundary/ErrorBoundary';
import DashboardTable from '@/shared/view/presentations/dashboard-table/DashboardTable';
import PageFilter from '@/shared/view/presentations/page-filter/PageFilter';
import PageTitle from '@/shared/view/presentations/page-title/PageTitle';
import { Form, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import useQueryAdminTransaction from './repositories/useGetAllTransaction';
import useGenerateColumnAdminTransaction from './usecase/useGenerateColumn';

function AdminTransactionContainer() {
  const [form] = useForm();

  const navigate = useNavigate();

  const {
    result,
    error,
    isLoading,
    setQueryAdminTransaction,
    queryAdminTransaction,
    handleFilter,
    clearFilter,
  } = useQueryAdminTransaction(form);

  const { columns } = useGenerateColumnAdminTransaction(navigate);

  return (
    <ErrorBoundary error={error as AxiosError}>
      <PageTitle title="Transaction" />
      <DashboardTable
        columns={columns}
        onPaginationChanges={setQueryAdminTransaction}
        loading={isLoading}
        data={result?.data}
        metadata={result?.meta_data}
        filterComponents={
          <PageFilter
            form={form}
            query={queryAdminTransaction}
            onApplyFilter={handleFilter}
            onClearFilter={clearFilter}
            onSearch={setQueryAdminTransaction}
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

export default AdminTransactionContainer;
