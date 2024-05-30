import defaultInspirationImage from '@/assets/default-inspiration-image.jpeg';
import threeDots from '@/assets/icon/more-circle.svg';
import { Button } from 'antd';

type TInspirationData = number;

interface IInspirationCardProps {
  inspiration: TInspirationData;
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
          <h4 className="font-medium">
            Whimsical Wonderland: Enchanting Wedding Decorations
          </h4>

          <Button className="p-0 m-0 shrink-0" type="link">
            <img src={threeDots} />
          </Button>
        </div>

        <div className="flex items-center gap-1">{inspiration}</div>
      </div>
    </div>
  );
}
