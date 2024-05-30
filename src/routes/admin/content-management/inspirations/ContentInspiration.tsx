import ContentInspirationHeader from './view/container/ContentInspirationHeader';
import useQueryAdmins from '../../admin-management/admin-user-management/repositories/useGetAllUser';
import { Form, Pagination, type PaginationProps } from 'antd';
import useModalReducer from './usecase/useModalReducer';
import { useLoaderData } from 'react-router-dom';
import type { ILoaderData } from '@/routes/root';
import InspirationCard from '@/shared/view/presentations/inspiration-card/InspirationCard';
import { useState } from 'react';
import ErrorBoundary from '@/shared/view/container/error-boundary/ErrorBoundary';
import type { AxiosError } from 'axios';
import PageTitle from '@/shared/view/presentations/page-title/PageTitle';

const inspirations = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function ContentInspiration() {
  const [form] = Form.useForm();
  const [formModal] = Form.useForm();

  // TODO: change to useQueryInspiration
  const {
    setQueryAdmins,
    queryAdmins,
    handleFilter,
    clearFilter,
    error,
    refetch,
  } = useQueryAdmins(form);

  const { permissions } = useLoaderData() as ILoaderData;
  const { create } = permissions;

  const { openModal, closeModal, modalState } = useModalReducer(formModal);

  // TODO: should change based on query
  const [current, setCurrent] = useState(3);
  const onChange: PaginationProps['onChange'] = (page) => {
    setCurrent(page);
  };

  return (
    <ErrorBoundary error={error as AxiosError} refetch={refetch}>
      <PageTitle title="Inspiration" />

      <ContentInspirationHeader
        clearFilter={clearFilter}
        create={create}
        form={form}
        handleFilter={handleFilter}
        query={queryAdmins}
        setQuery={setQueryAdmins}
        openModal={openModal}
        closeModal={closeModal}
        modalState={modalState}
      />

      <div className="grid grid-cols-3 gap-x-5 gap-y-4">
        {inspirations.map((inspiration) => (
          <InspirationCard key={inspiration} inspiration={inspiration} />
        ))}
      </div>

      <div className="flex justify-between items-center mt-7">
        {/* TODO: change this based on query */}
        <p>Showing x to x of x entries</p>

        <Pagination
          className="my-0"
          // TODO: change this to query result
          current={current}
          onChange={onChange}
          total={50}
        />
      </div>
    </ErrorBoundary>
  );
}
