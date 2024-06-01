import defaultInspirationImage from '@/assets/default-inspiration-image.jpeg';
import threeDots from '@/assets/icon/more-circle.svg';
import FormEdit from '@/routes/admin/content-management/inspirations/view/presentations/Modal/FormEdit';
import type { IDetailInspirationData } from '@/shared/models/inspirationInterfaces';
import { Button, Form, Modal, Tag } from 'antd';
import FormFooter from '../form-footer/FormFooter';
import { useLoaderData } from 'react-router-dom';
import type { ILoaderData } from '@/routes/root';
import useModalReducer from '@/shared/usecase/useModalReducer';
import useMutateEditInspirations from '@/routes/admin/content-management/inspirations/repositories/useEditInspirations';

interface IInspirationCardProps {
  inspiration: IDetailInspirationData;
  refetch?: () => void;
}

export default function InspirationCard({
  inspiration,
  refetch,
}: IInspirationCardProps) {
  const [formModal] = Form.useForm();
  const { permissions } = useLoaderData() as ILoaderData;
  const { edit } = permissions;
  const { openModal, closeModal, modalState } = useModalReducer(formModal);
  const { mutate: mutateEdit } = useMutateEditInspirations(
    inspiration.id,
    closeModal,
    refetch
  );

  const modalType = {
    edit: (
      <FormEdit
        initialValues={inspiration}
        form={formModal}
        handleMutate={mutateEdit}
        footer={
          <FormFooter
            secondaryText="Cancel"
            secondaryProps={{
              onClick: () => {
                formModal.resetFields();
                return closeModal!();
              },
            }}
            primaryText="Create"
            primaryProps={{ type: 'submit' }}
          />
        }
      />
    ),
  };
  return (
    <>
      <Modal
        title={
          <div className="capitalize">{`${modalState?.type} Inspiration`}</div>
        }
        open={modalState?.isOpen}
        footer={null}
        onCancel={closeModal}>
        {modalType[modalState!.type]}
      </Modal>

      <div className="flex rounded-md w-full border-2 flex-col overflow-hidden">
        <div className="h-[348px]">
          <img
            className="bg-cover h-[348px] w-full"
            src={inspiration.image ?? defaultInspirationImage}
            alt="default inspiration"
          />
        </div>
        <div className="flex flex-col gap-2 p-3 w-full">
          <div className="flex items-center gap-4 w-full justify-between">
            <h4 className="font-medium">{inspiration.name}</h4>

            <Button
              disabled={edit}
              onClick={() => openModal!('edit')}
              className="p-0 m-0 shrink-0"
              type="link">
              <img src={threeDots} />
            </Button>
          </div>

          <div className="flex flex-col w-full gap-2">
            <div className="flex w-full items-center">
              {inspiration.tags.map((tag) => (
                <Tag key={tag.label} className="capitalize w-max">
                  {tag.label}
                </Tag>
              ))}
            </div>

            <Tag
              className="capitalize w-max"
              color={inspiration.status === 'active' ? 'green' : 'red'}>
              {inspiration.status}
            </Tag>
          </div>
        </div>
      </div>
    </>
  );
}
