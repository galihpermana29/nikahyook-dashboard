import { Divider } from 'antd';

interface ICuratorialModalFooter {
  secondaryText: string;
  secondaryProps: any;
  primaryText: string;
  primaryProps: any;
  itemCount: number;
}

const CuratorialModalFooter = ({
  secondaryProps,
  secondaryText,
  primaryProps,
  primaryText,
  itemCount,
}: ICuratorialModalFooter) => {
  return (
    <div className="flex flex-col gap-5">
      <Divider className="mt-5 mb-0" />
      <div className="flex items-center w-full">
        <p className="w-full font-bold">Total {itemCount ?? 0} item(s)</p>

        <div className="flex gap-[20px] w-full">
          <button
            type="button"
            {...secondaryProps}
            className="flex-1 rounded-[8px] h-[40px] bg-ny-primary-100 text-ny-primary-500 text-body-2 font-[400]">
            {secondaryText}
          </button>
          <button
            {...primaryProps}
            className="flex-1 rounded-[8px] h-[40px] bg-ny-primary-500 text-white text-body-2 font-[400]">
            {primaryText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CuratorialModalFooter;
