import defaultInspirationImage from '@/assets/default-inspiration-image.jpeg';
import threeDots from '@/assets/icon/more-circle.svg';
import type { IDetailInspirationData } from '@/shared/models/inspirationInterfaces';
import type { TModalType } from '@/shared/usecase/useModalReducer';
import { Button, Tag } from 'antd';

interface IInspirationCardProps {
  inspiration: IDetailInspirationData;
  openModal?: (modalType: TModalType, id?: string) => void;
  disableEdit?: boolean;
}

export default function InspirationCard({
  inspiration,
  openModal,
  disableEdit,
}: IInspirationCardProps) {
  return (
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
            disabled={disableEdit}
            onClick={() => openModal!('edit', inspiration.id.toString())}
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
  );
}
