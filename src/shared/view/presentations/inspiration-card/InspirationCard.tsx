import defaultInspirationImage from '@/assets/default-inspiration-image.jpeg';
import threeDots from '@/assets/icon/more-circle.svg';
import type { IDetailInspirationData } from '@/shared/models/inspirationInterfaces';
import { Button, Tag } from 'antd';

interface IInspirationCardProps {
  inspiration: IDetailInspirationData;
}

export default function InspirationCard({
  inspiration,
}: IInspirationCardProps) {
  return (
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

          <Button className="p-0 m-0 shrink-0" type="link">
            <img src={threeDots} />
          </Button>
        </div>

        <div className="flex flex-col w-full gap-2">
          <div className="flex w-full items-center">
            {inspiration.tags.map((tag) => (
              <Tag id={tag.id.toString()} className="capitalize w-max">
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
  );
}
