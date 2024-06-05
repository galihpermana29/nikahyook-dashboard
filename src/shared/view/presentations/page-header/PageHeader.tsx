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
      <div className="flex justify-between items-center">
        <h1 className="text-[#323232] text-heading-6">{title}</h1>
        <div className="flex items-center gap-[15px]">
          {buttonsBefore}
          <Button
            onClick={onCancel}
            className="enabled:hover:!bg-white enabled:hover:!text-[#323232] h-[40px] bg-white text-[#323232] text-body-2  font-[400] rounded-[8px] flex items-center gap-[8px] cursor-pointer">
            Cancel
          </Button>
          <Button
            htmlType="submit"
            className="enabled:hover:!bg-ny-primary-500 enabled:hover:!text-white h-[40px] bg-ny-primary-500 text-white text-body-2  font-[400] rounded-[8px] flex items-center gap-[8px] cursor-pointer">
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
