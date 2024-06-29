import { Button } from 'antd';
import CloseIcon from '@/assets/icon/close.svg';
import primaryLogo from '@/assets/primary-logo.svg';

type IDrawerTitle = {
  handleClose: () => void;
};

const DrawerTitle = ({ handleClose }: IDrawerTitle) => {
  return (
    <div className="flex items-center justify-between">
      <img src={primaryLogo} alt="Nikahyook Logo" />
      <Button
        onClick={handleClose}
        type="text"
        className="cursor-pointer w-fit h-fit"
      >
        <img src={CloseIcon} alt="Menu Icon" />
      </Button>
    </div>
  );
};

export default DrawerTitle;
