import ContentInspirationHeader from './view/container/ContentInspirationHeader';
import { Button, Form, Modal } from 'antd';
import useModalReducer from '@/shared/usecase/useModalReducer';
import { useLoaderData } from 'react-router-dom';
import type { ILoaderData } from '@/routes/root';
import InspirationCard from '@/shared/view/presentations/inspiration-card/InspirationCard';
import ErrorBoundary from '@/shared/view/container/error-boundary/ErrorBoundary';
import type { AxiosError } from 'axios';
import PageTitle from '@/shared/view/presentations/page-title/PageTitle';
import useQueryInspirations from './repositories/useQueryInspirations';
import type { IDetailInspirationData } from '@/shared/models/inspirationInterfaces';
import LoadingHandler from '@/shared/view/container/loading/Loading';
import useMutateCreateInspirations from './repositories/useCreateInspirations';
import FormCreation from './view/presentations/Modal/FormCreation';
import FormFooter from '@/shared/view/presentations/form-footer/FormFooter';
import FormEdit from './view/presentations/Modal/FormEdit';
import useMutateEditInspirations from './repositories/useEditInspirations';
import useQueryTags from '../../vendor-management/vendor-content/repositories/useGetAllTags';
import useQueryInspirationById from './repositories/useQueryInspirationsById';
import threeDots from '@/assets/icon/more-circle.svg';
import Pagination from '@/shared/view/presentations/pagination/Pagination';

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
  const { create, edit } = permissions;

  const { openModal, closeModal, modalState } = useModalReducer(formModal);

  const { isLoading: loadingGetDetail } = useQueryInspirationById(
    modalState,
    formModal
  );

  const { mutate: mutateEdit } = useMutateEditInspirations(
    parseInt(modalState?.id ?? ''),
    closeModal,
    refetch
  );

  const { mutate: mutateCreate } = useMutateCreateInspirations(
    closeModal,
    refetch
  );

  const { result: tags } = useQueryTags();

  const modalType = {
    create: (
      <FormCreation
        form={formModal}
        handleMutate={mutateCreate}
        tags={tags?.selectOptions}
        footer={
          <FormFooter
            secondaryText="Cancel"
            secondaryProps={{
              onClick: () => closeModal!(),
            }}
            primaryText="Create"
            primaryProps={{ type: 'submit' }}
          />
        }
      />
    ),
    edit: (
      <FormEdit
        isLoading={loadingGetDetail}
        id={modalState?.id}
        form={formModal}
        handleMutate={mutateEdit}
        tags={tags?.selectOptions}
        footer={
          <FormFooter
            secondaryText="Cancel"
            secondaryProps={{
              onClick: () => {
                form.resetFields();
                return closeModal!();
              },
            }}
            primaryText="Edit"
            primaryProps={{ type: 'submit' }}
          />
        }
      />
    ),
  };

  return (
    <ErrorBoundary error={error as AxiosError} refetch={refetch}>
      <PageTitle title="Inspiration" />
      <Modal
        title={
          <div className="capitalize">{`${modalState?.type} Inspiration`}</div>
        }
        open={modalState?.isOpen}
        footer={null}
        onCancel={closeModal}>
        {modalType[modalState!.type]}
      </Modal>

      <LoadingHandler fullscreen isLoading={isLoading}>
        <ContentInspirationHeader
          handleMutate={mutateCreate}
          clearFilter={clearFilter}
          create={create}
          form={form}
          tags={tags?.selectOptions}
          formModal={form}
          handleFilter={handleFilter}
          query={query}
          setQuery={setQuery}
          openModal={openModal}
          closeModal={closeModal}
          modalState={modalState}
        />

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-4">
          {inspirations.map((inspiration) => (
            <InspirationCard
              key={inspiration.id}
              inspiration={inspiration}
              miscButton={
                <Button
                  disabled={!edit}
                  onClick={() => openModal!('edit', inspiration.id.toString())}
                  className="p-0 m-0 shrink-0"
                  type="link">
                  <img src={threeDots} />
                </Button>
              }
            />
          ))}
        </div>

        <Pagination onPaginationChanges={setQuery} metadata={meta_data} />
      </LoadingHandler>
    </ErrorBoundary>
  );
}
