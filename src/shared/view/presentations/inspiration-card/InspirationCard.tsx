import defaultInspirationImage from '@/assets/default-inspiration-image.jpeg';
import type { IDetailInspirationData } from '@/shared/models/inspirationInterfaces';
import { Tag } from 'antd';

interface IInspirationCardProps {
  inspiration: IDetailInspirationData;
  miscButton?: React.ReactNode;
}

export default function InspirationCard({
  inspiration,
  miscButton,
}: IInspirationCardProps) {
  return (
    <div className="flex rounded-md border-2 flex-col overflow-hidden">
      <div className="aspect-square">
        <img
          className="bg-cover object-cover aspect-square size-full"
          src={inspiration.image ?? defaultInspirationImage}
          alt="default inspiration"
        />
      </div>
      <div className="flex flex-col gap-2 p-3 w-full">
        <div className="flex items-center gap-4 w-full justify-between">
          <h4 className="font-medium">{inspiration.name}</h4>

          {miscButton}
        </div>

        <div className="flex flex-col w-full gap-2">
          <div className="flex w-full items-center flex-wrap gap-y-2">
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
