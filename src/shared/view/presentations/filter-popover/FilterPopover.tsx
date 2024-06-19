import { Button, Divider, Form, FormInstance, Popover } from 'antd';
import filterIcon from '@/assets/icon/filter.png';

interface IFilterPopover {
  form: FormInstance<any>;
  popoverComponents: React.ReactNode;
  onApplyFilter: any;
  onClearFilter: any;
}
const FilterPopover = ({
  form,
  popoverComponents,
  onApplyFilter,
  onClearFilter,
}: IFilterPopover) => {
  const content = (
    <div className="min-w-[224px]">
      <Form layout="vertical" form={form} onFinish={onApplyFilter}>
        {popoverComponents}
        <Divider className="my-[8px]" />
        <div className="my-0 justify-end flex gap-[5px]">
          <Button
            onClick={onClearFilter}
            className="hover:!bg-ny-primary-100 hover:!text-ny-primary-500 h-[35px] bg-ny-primary-100 text-ny-primary-500 text-caption-1  font-[400] rounded-[8px]">
            Reset
          </Button>
          <Button
            htmlType="submit"
            className="hover:!bg-ny-primary-500 hover:!text-white h-[35px] bg-ny-primary-500 text-white text-caption-1  font-[400] rounded-[8px]">
            Apply
          </Button>
        </div>
      </Form>
    </div>
  );

  return (
    <div>
      <Popover
        content={content}
        title="Filter"
        trigger="click"
        placement="bottomRight">
        <Button className="flex justify-center items-center gap-[8px] h-[40px] border-ny-gray-100 border-[1px] rounded-[8px] bg-white text-black hover:bg-white hover:text-black min-w-max md:min-w-[90px]">
          <img src={filterIcon} alt="filter icon" />
          <div className="lg:block hidden">Filter</div>
        </Button>
      </Popover>
    </div>
  );
};

export default FilterPopover;
