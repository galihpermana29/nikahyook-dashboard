import type { ILoaderData } from '@/routes/root';
import { Button, Form, Select } from 'antd';
import { useLoaderData, useNavigate } from 'react-router-dom';
import useGenerateColumnCuratorials from './usecase/useGenerateColumn';
import useQueryCuratorials from './repositories/useGetAllCuratorials';
import useMutateUpdateCuratorial from './repositories/useUpdateCuratorial';
import ErrorBoundary from '@/shared/view/container/error-boundary/ErrorBoundary';
import type { AxiosError } from 'axios';
import PageTitle from '@/shared/view/presentations/page-title/PageTitle';
import DashboardTable from '@/shared/view/presentations/dashboard-table/DashboardTable';
import type { IDetailInspirationData } from '@/shared/models/inspirationInterfaces';
import PageFilter from '@/shared/view/presentations/page-filter/PageFilter';
import addIcon from '@/assets/icon/add.png';
import type { TGeneralSelectOptions } from '@/shared/models/generalInterfaces';

export default function CuratorialsPage() {
  const [form] = Form.useForm();

  const { permissions } = useLoaderData() as ILoaderData;
  const { create, view, edit, remove } = permissions;

  const navigate = useNavigate();

  const {
    result,
    error,
    isLoading: loadingGetAll,
    setQueryOptions,
    queryOptions,
    refetch,
    handleFilter,
    clearFilter,
    roles,
  } = useQueryCuratorials(form);

  const { mutate: mutateEdit } = useMutateUpdateCuratorial(refetch);

  const { columns } = useGenerateColumnCuratorials(
    remove,
    edit,
    view,
    navigate,
    mutateEdit
  );

  return (
    <ErrorBoundary error={error as AxiosError} refetch={refetch}>
      <PageTitle title="Vendor User Management" />

      <DashboardTable<IDetailInspirationData>
        columns={columns}
        data={result?.data}
        onPaginationChanges={setQueryOptions}
        loading={loadingGetAll}
        metadata={result?.meta_data}
        filterComponents={
          <PageFilter
            form={form}
            query={queryOptions}
            onApplyFilter={handleFilter}
            onClearFilter={clearFilter}
            onSearch={setQueryOptions}
            buttonComponents={
              <Button
                disabled={create}
                href="curatorial/create-user"
                className="hover:!bg-ny-primary-500 hover:!text-white h-[40px] bg-ny-primary-500 text-white text-body-2  font-[400] rounded-[8px] flex items-center gap-[8px] cursor-pointer">
                <img src={addIcon} alt="add-icon" />
                Create User
              </Button>
            }
            filterComponents={
              <>
                <Form.Item
                  name={'status'}
                  label="Status"
                  initialValue={queryOptions.status}
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
                <Form.Item name={'role_id'} label="Role">
                  <Select
                    placeholder="Enter your detail here"
                    options={roles as TGeneralSelectOptions[]}
                    className="h-[40px] rounded-[8px]"
                  />
                </Form.Item>
              </>
            }
          />
        }
      />
    </ErrorBoundary>
  );
}
