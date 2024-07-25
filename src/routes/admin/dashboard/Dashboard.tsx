import { AxiosError } from 'axios';
import { DatePicker } from 'antd';
import { Link, useSearchParams } from 'react-router-dom';
import { RangePickerProps } from 'antd/es/date-picker';
import { useState } from 'react';
import DashboardCard from './view/presentations/dashboard-card/DashboardCard';
import dayjs from 'dayjs';
import ErrorBoundary from '@/shared/view/container/error-boundary/ErrorBoundary';
import LineChart from './view/presentations/chart/LineChart';
import useQueryStatistics from './repositories/useGetStatistics';

const DashboardContainer = () => {
  const { RangePicker } = DatePicker;
  const [searchParams] = useSearchParams();

  const startDate = searchParams.get('start_date_trx');
  const endDate = searchParams.get('end_date_trx');

  const [dates, setDates] = useState<
    [dayjs.Dayjs | null, dayjs.Dayjs | null] | null
  >(null);
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(
    () => {
      if (startDate && endDate) {
        return [dayjs(startDate, 'DD-MM-YYYY'), dayjs(endDate, 'DD-MM-YYYY')];
      }
      return [dayjs().subtract(6, 'day'), dayjs()];
    }
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
      setQueryStatistics({
        start_date_trx: values[0].format('DD-MM-YYYY'),
        end_date_trx: values[1].format('DD-MM-YYYY'),
      });
    } else {
      setDateRange(null);
      setQueryStatistics({
        start_date_trx: dayjs().subtract(6, 'day').format('DD-MM-YYYY'),
        end_date_trx: dayjs().format('DD-MM-YYYY'),
      });
    }
  };

  const onOpenChange = (open: boolean) => {
    if (open) {
      setDates([null, null]);
    } else {
      setDates(null);
    }
  };

  const { result, error, isLoading, setQueryStatistics, refetch } =
    useQueryStatistics();

  return (
    <ErrorBoundary error={error as AxiosError} refetch={refetch}>
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
          size="large"
          responsive
          isLoading={isLoading}
        >
          <LineChart
            isLoading={isLoading}
            dateRange={dateRange}
            total_transaction={result?.total_transaction ?? 0}
            transactions={result?.transactions ?? []}
          />
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
          isLoading={isLoading}
        >
          <div className="flex flex-col items-center justify-between h-[70%] sm:h-[90%]">
            <div className="flex items-center justify-center h-full">
              <h3 className="text-heading-1 sm:text-heading-2 lg:text-display-1 font-bold text-center leading-tight lg:leading-[86px] bg-gradient-to-br from-[#850362] from-5% to-[#E60B6A] text-transparent bg-clip-text">
                {result?.total_product} <br /> Product
              </h3>
            </div>
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
          isLoading={isLoading}
        >
          <div className="flex flex-col h-full">
            <p className="text-heading-1 font-bold text-ny-primary-500">
              {result?.total_user}
            </p>
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
          isLoading={isLoading}
        >
          <div className="flex flex-col h-full">
            <p className="text-heading-1 font-bold text-ny-primary-500">
              {result?.total_vendor}
            </p>
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
          isLoading={isLoading}
        >
          <div className="flex flex-col h-full">
            <p className="text-heading-1 font-bold text-ny-primary-500">
              {result?.total_admin}
            </p>
          </div>
        </DashboardCard>
      </div>
    </ErrorBoundary>
  );
};

export default DashboardContainer;
