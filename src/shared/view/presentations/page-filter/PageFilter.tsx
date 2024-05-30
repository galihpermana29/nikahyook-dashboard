import { FormInstance, Input } from 'antd';
import searchIcon from '@/assets/icon/search.png';
import FilterPopover from '../filter-popover/FilterPopover';
import { TGeneralFilter } from '@/shared/models/generalInterfaces';

interface IPageFilter {
  onSearch: React.Dispatch<React.SetStateAction<TGeneralFilter>>;
  onApplyFilter: any;
  onClearFilter: any;
  form: FormInstance<any>;
  filterComponents: React.ReactNode;
  query: TGeneralFilter;
  buttonComponents: React.ReactNode;
}
const PageFilter = ({
  onSearch,
  onApplyFilter,
  onClearFilter,
  form,
  filterComponents,
  query,
  buttonComponents,
}: IPageFilter) => {
  return (
    <div className="flex justify-between items-center">
      <Input
        value={query.keyword}
        onChange={(e) => onSearch((dx) => ({ ...dx, keyword: e.target.value }))}
        prefix={<img src={searchIcon} alt="seearch" />}
        className="h-[40px] w-full max-w-[300px] rounded-[8px] [&>input]:!text-caption-1 [&>input]:!font-[400]"
        placeholder="Search data.."
      />
      <div className="flex gap-[8px]">
        <FilterPopover
          onClearFilter={onClearFilter}
          form={form}
          popoverComponents={filterComponents}
          onApplyFilter={onApplyFilter}
        />

        {buttonComponents}
      </div>
    </div>
  );
};

export default PageFilter;
