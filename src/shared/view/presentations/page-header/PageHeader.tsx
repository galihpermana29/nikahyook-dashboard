import { Button, Divider } from 'antd';
interface IPageHeader {
  title: string;
  onCancel: any;
  id?: string;
  buttonsBefore?: React.ReactNode;
  buttonsAfter?: React.ReactNode;
}

const PageHeader = ({
  title,
  onCancel,
  buttonsBefore,
  buttonsAfter,
}: IPageHeader) => {
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <h1 className="text-[#323232] text-body-1 sm:text-heading-6 font-medium w-full sm:w-auto">
          {title}
        </h1>
        <div className="flex items-center flex-wrap gap-[15px] w-full sm:w-auto">
          {buttonsBefore}
          <Button
            onClick={onCancel}
            className="enabled:hover:!bg-white enabled:hover:!text-[#323232] h-[40px] bg-white text-[#323232] text-caption-1 sm:text-body-2 font-[400] rounded-[8px] flex items-center justify-center gap-[8px] cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            htmlType="submit"
            className="enabled:hover:!bg-ny-primary-500 enabled:hover:!text-white h-[40px] bg-ny-primary-500 text-white text-caption-1 sm:text-body-2 font-[400] rounded-[8px] flex items-center justify-center gap-[8px] cursor-pointer"
          >
            Save
          </Button>
          {buttonsAfter}
        </div>
      </div>
      <Divider className="my-[5px]" />
    </>
  );
};

export default PageHeader;
