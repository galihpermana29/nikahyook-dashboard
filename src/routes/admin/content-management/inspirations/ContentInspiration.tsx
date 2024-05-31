import ContentInspirationHeader from './view/container/ContentInspirationHeader';
import { Form } from 'antd';
import useModalReducer from './usecase/useModalReducer';
import { useLoaderData } from 'react-router-dom';
import type { ILoaderData } from '@/routes/root';
import InspirationCard from '@/shared/view/presentations/inspiration-card/InspirationCard';
import ErrorBoundary from '@/shared/view/container/error-boundary/ErrorBoundary';
import type { AxiosError } from 'axios';
import PageTitle from '@/shared/view/presentations/page-title/PageTitle';
import useQueryInspirations from './repositories/useQueryInspirations';
import type { IDetailInspirationData } from '@/shared/models/inspirationInterfaces';
import LoadingHandler from '@/shared/view/container/loading/Loading';
import InspirationPagination from './view/presentations/InspirationPagination';
import useMutateCreateInspirations from './repositories/useCreateInspirations';

export default function ContentInspiration() {
  const [form] = Form.useForm();
  const [formModal] = Form.useForm();

  const {
    result,
    query,
    setQuery,
    handleFilter,
    clearFilter,
    error,
    refetch,
    isLoading,
  } = useQueryInspirations(form);

  const inspirations = result?.data
    ? (result.data as IDetailInspirationData[])
    : [];

  const meta_data = result?.meta_data;

  const { permissions } = useLoaderData() as ILoaderData;
  const { create } = permissions;

  const { openModal, closeModal, modalState } = useModalReducer(formModal);
  const { mutate: mutateCreate } = useMutateCreateInspirations(
    closeModal,
    refetch
  );

  return (
    <ErrorBoundary error={error as AxiosError} refetch={refetch}>
      <LoadingHandler classname="h-screen" isLoading={isLoading}>
        <PageTitle title="Inspiration" />

        <ContentInspirationHeader
          handleMutate={mutateCreate}
          clearFilter={clearFilter}
          create={create}
          form={form}
          handleFilter={handleFilter}
          query={query}
          setQuery={setQuery}
          openModal={openModal}
          closeModal={closeModal}
          modalState={modalState}
        />

        <div className="grid grid-cols-3 gap-x-5 gap-y-4">
          {inspirations.map((inspiration) => (
            <InspirationCard
              closeModal={closeModal}
              openModal={openModal}
              modalState={modalState}
              key={inspiration.id}
              inspiration={inspiration}
            />
          ))}
        </div>

        <InspirationPagination
          onPaginationChanges={setQuery}
          metadata={meta_data}
        />
      </LoadingHandler>
    </ErrorBoundary>
  );
}
