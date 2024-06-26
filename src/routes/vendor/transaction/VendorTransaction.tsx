import DashboardTable from '@/shared/view/presentations/dashboard-table/DashboardTable';
import PageTitle from '@/shared/view/presentations/page-title/PageTitle';
import useGenerateColumnVendorTransaction from './usecase/useGenerateColumn';
import PageFilter from '@/shared/view/presentations/page-filter/PageFilter';
import { Form, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { TGeneralFilter } from '@/shared/models/generalInterfaces';
import { useNavigate } from 'react-router-dom';

//* will be deleted on integration
const dummyData = [
  {
    id: 123,
    buyer: 'John Wick',
    order_date: '25/05/24',
    status: 'waiting-for-approval',
  },
  {
    id: 234,
    buyer: 'Dipsy',
    order_date: '25/05/24',
    status: 'waiting-for-payment',
  },
  {
    id: 345,
    buyer: 'Lala',
    order_date: '25/05/24',
    status: 'payment-in-review',
  },
  {
    id: 456,
    buyer: 'Po',
    order_date: '25/05/24',
    status: 'payment-done',
  },
  {
    id: 567,
    buyer: 'Xi Jian',
    order_date: '25/05/24',
    status: 'order-rejected',
  },
];

function VendorTransactionContainer() {
  const [form] = useForm();

  const navigate = useNavigate();

  const { columns } = useGenerateColumnVendorTransaction(navigate);

  return (
    <>
      {/* <ErrorBoundary error={new Error() as AxiosError}> */}
      <PageTitle title="Transaction" />
      <DashboardTable
        columns={columns}
        onPaginationChanges={() => {}}
        loading={false}
        data={dummyData}
        metadata={undefined}
        filterComponents={
          <PageFilter
            form={form}
            query={{} as TGeneralFilter}
            onApplyFilter={() => {}}
            onClearFilter={() => {}}
            onSearch={() => {}}
            filterComponents={
              <Form.Item name={'status'} label="Status" className="my-[10px]">
                <Select
                  className="h-[35px]"
                  options={[
                    { value: 'default', label: 'All' },
                    { value: 'active', label: 'Active' },
                    { value: 'inactive', label: 'Inactive' },
                  ]}
                />
              </Form.Item>
            }
          />
        }
      />
      {/* </ErrorBoundary> */}
    </>
  );
}

export default VendorTransactionContainer;
