import defaultInspirationImage from '@/assets/default-inspiration-image.jpeg';
import threeDots from '@/assets/icon/more-circle.svg';
import FormEdit from '@/routes/admin/content-management/inspirations/view/presentations/Modal/FormEdit';
import type { IDetailInspirationData } from '@/shared/models/inspirationInterfaces';
import { Button, Form, Modal, Tag } from 'antd';
import FormFooter from '../form-footer/FormFooter';
import type {
  TModalState,
  TModalType,
} from '@/routes/admin/content-management/inspirations/usecase/useModalReducer';
import { useLoaderData } from 'react-router-dom';
import type { ILoaderData } from '@/routes/root';

interface IInspirationCardProps {
  inspiration: IDetailInspirationData;
  openModal:
    | ((modalType: TModalType, id?: string | undefined) => void)
    | undefined;
  closeModal: (() => void) | undefined;
  modalState: TModalState | undefined;
}

export default function InspirationCard({
  inspiration,
  openModal,
  closeModal,
  modalState,
}: IInspirationCardProps) {
  const [formModal] = Form.useForm();
  const { permissions } = useLoaderData() as ILoaderData;
  const { edit } = permissions;

  const modalType = {
    edit: (
      <FormEdit
        form={formModal}
        // TODO: add use mutate from API
        // handleMutate={mutateCreate}
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
        <div className="bg-ny-primary-500 h-auto w-full overflow-hidden bg-bottom">
          <img
            src={defaultInspirationImage}
            alt="default inspiration"
            style={{ backgroundSize: 'cover' }}
          />
        </div>
        <div className="flex flex-col gap-2 p-3 w-full">
          <div className="flex items-center gap-4 w-full justify-between">
            <h4 className="font-medium">{inspiration.name}</h4>

            <Button
              disabled={!edit}
              onClick={() => openModal!('edit')}
              className="p-0 m-0 shrink-0"
              type="link">
              <img src={threeDots} />
            </Button>
          </div>

          <div className="flex flex-col w-full gap-2">
            <div className="flex w-full items-center">
              {inspiration.tags.map((tag) => (
                <Tag key={tag.name} className="capitalize w-max">
                  {tag.name}
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
