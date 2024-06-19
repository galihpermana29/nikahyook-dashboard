import addIcon from '@/assets/icon/add.png';
import { ILoaderData } from '@/routes/root';
import { IDetailUserData } from '@/shared/models/userServicesInterface';
import ErrorBoundary from '@/shared/view/container/error-boundary/ErrorBoundary';
import DashboardTable from '@/shared/view/presentations/dashboard-table/DashboardTable';
import PageFilter from '@/shared/view/presentations/page-filter/PageFilter';
import PageTitle from '@/shared/view/presentations/page-title/PageTitle';
import { Button, Form, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { AxiosError } from 'axios';
import { useLoaderData, useNavigate } from 'react-router-dom';
import useQueryVendorUser from './repositories/useGetAllVendorUser';
import useMutateEditVendorUser from './repositories/useUpdateVendorUser';
import useGenerateColumnVendorUser from './usecase/useGenerateColumn';

export const VendorUserManagementContainer = () => {
  const [form] = useForm();

  const navigate = useNavigate();

  const { permissions } = useLoaderData() as ILoaderData;
  const { create, view, edit, remove } = permissions;

  const {
    result,
    queryVendorUser,
    setQueryVendorUser,
    isLoading: loadingGetAll,
    handleFilter,
    clearFilter,
    refetch,
    error,
  } = useQueryVendorUser(form);

  const { mutate: mutateEdit } = useMutateEditVendorUser(refetch);

  const { columns } = useGenerateColumnVendorUser(
    remove,
    edit,
    view,
    navigate,
    mutateEdit
  );

  return (
    <ErrorBoundary error={error as AxiosError} refetch={refetch}>
      <PageTitle title="Vendor Account" />

      <DashboardTable<IDetailUserData>
        columns={columns}
        data={result?.data}
        onPaginationChanges={setQueryVendorUser}
        loading={loadingGetAll}
        metadata={result?.meta_data}
        filterComponents={
          <PageFilter
            form={form}
            query={queryVendorUser}
            onApplyFilter={handleFilter}
            onClearFilter={clearFilter}
            onSearch={setQueryVendorUser}
            buttonComponents={
              <Button
                disabled={!create}
                href="vendor-account/create-user"
                className="hover:!bg-ny-primary-500 hover:!text-white h-[40px] bg-ny-primary-500 text-white text-body-2  font-[400] rounded-[8px] flex items-center gap-[8px] cursor-pointer min-w-max">
                <img src={addIcon} alt="add-icon" />
                <div className="hidden md:block"> Create Vendor</div>
              </Button>
            }
            filterComponents={
              <Form.Item
                name={'status'}
                label="Status"
                initialValue={queryVendorUser.status}
                className="my-[10px]">
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
    </ErrorBoundary>
  );
};
