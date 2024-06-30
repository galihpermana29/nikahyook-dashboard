import { DatePicker } from 'antd';
import { Divider } from 'antd';
import { Link } from 'react-router-dom';
import { RangePickerProps } from 'antd/es/date-picker';
import { useState } from 'react';
import DashboardCard from './view/presentations/dashboard-card/DashboardCard';
import dayjs from 'dayjs';
import LineChart from './view/presentations/chart/LineChart';
import ProfilePictureGrid from './view/presentations/profile-picture-grid/ProfilePictureGrid';
import useGenerateProfilePictures from './usecase/useGenerateProfilePictures';

const DashboardContainer = () => {
  const { RangePicker } = DatePicker;

  const [dates, setDates] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null] | null>(null);
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(
    [dayjs().subtract(6, 'day'), dayjs()]
  );

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    if (!dates) {
      // If no date is selected, only disable future dates
      return current && current > dayjs().endOf('day');
    }

    const tooEarly = dates[0] && current.isBefore(dates[0].startOf('day'));
    const tooLate = dates[1] && current.isAfter(dates[1].endOf('day'));

    // Disable dates if they are more than 7 days apart from the selected date
    if (dates[0] && !dates[1]) {
      return (
        tooEarly ||
        current.diff(dates[0], 'day') > 6 ||
        current > dayjs().endOf('day')
      );
    }
    if (!dates[0] && dates[1]) {
      return (
        tooLate ||
        dates[1].diff(current, 'day') > 6 ||
        current > dayjs().endOf('day')
      );
    }

    return tooEarly || tooLate || current > dayjs().endOf('day');
  };

  const handleDateRangeChange: RangePickerProps['onChange'] = (values) => {
    if (values && values[0] && values[1]) {
      setDateRange([values[0], values[1]]);
    } else {
      setDateRange(null);
    }
  };

  const onOpenChange = (open: boolean) => {
    if (open) {
      setDates([null, null]);
    } else {
      setDates(null);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-5">
      <DashboardCard
        title="Transaction"
        actionComponent={
          <RangePicker
            value={dates || dateRange}
            disabledDate={disabledDate}
            onCalendarChange={(val) => setDates(val)}
            onChange={handleDateRangeChange}
            onOpenChange={onOpenChange}
          />
        }
        size='large'
      >
        <LineChart dateRange={dateRange} />
      </DashboardCard>
      <DashboardCard
        title="Product"
        actionComponent={
          <Link
            className="text-caption-2 font-bold tracking-[14%] text-ny-primary-500 hover:text-ny-primary-500"
            to={'/vendor-product'}
          >
            SEE ALL
          </Link>
        }
      >
        <div className="flex flex-col items-center justify-between h-[90%]">
          <div className="flex items-center justify-center h-full">
            <h3 className="text-display-1 font-bold text-center leading-[86px] bg-gradient-to-br from-[#850362] from-5% to-[#E60B6A] text-transparent bg-clip-text">
              70 <br /> Product
            </h3>
          </div>
          <p className="text-heading-4 font-medium text-ny-gray-400 text-center">
            +3 Today
          </p>
        </div>
      </DashboardCard>
      <DashboardCard
        title="User"
        actionComponent={
          <Link
            className="text-caption-2 font-bold tracking-[14%] text-ny-primary-500 hover:text-ny-primary-500"
            to={'/user-account'}
          >
            SEE ALL
          </Link>
        }
      >
        <div className="flex flex-col h-full">
          <p className="text-heading-1 font-bold text-ny-primary-500">1444</p>
          <Divider />
          <ProfilePictureGrid data={useGenerateProfilePictures(6)} />
        </div>
      </DashboardCard>
      <DashboardCard
        title="Vendor"
        actionComponent={
          <Link
            className="text-caption-2 font-bold tracking-[14%] text-ny-primary-500 hover:text-ny-primary-500"
            to={'/vendor-account'}
          >
            SEE ALL
          </Link>
        }
      >
        <div className="flex flex-col h-full">
          <p className="text-heading-1 font-bold text-ny-primary-500">50</p>
          <Divider />
          <ProfilePictureGrid data={useGenerateProfilePictures(6)} />
        </div>
      </DashboardCard>
      <DashboardCard
        title="Admin"
        actionComponent={
          <Link
            className="text-caption-2 font-bold tracking-[14%] text-ny-primary-500 hover:text-ny-primary-500"
            to={'/admin-account'}
          >
            SEE ALL
          </Link>
        }
      >
        <div className="flex flex-col h-full">
          <p className="text-heading-1 font-bold text-ny-primary-500">11</p>
          <Divider />
          <ProfilePictureGrid data={useGenerateProfilePictures(6)} />
        </div>
      </DashboardCard>
    </div>
  );
};

export default DashboardContainer;
