import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  ChartOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useGenerateChartData } from '../../../usecase/useGenerateChartData';
import ArrowUp from '@/assets/icon/arrow-green-icon.svg'
import dayjs from 'dayjs';

const LineChart = ({
  dateRange,
}: {
  dateRange: [dayjs.Dayjs, dayjs.Dayjs] | null;
}) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Filler
  );

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: { drawOnChartArea: false },
      },
      y: {
        grid: { drawOnChartArea: false },
        ticks: { maxTicksLimit: 9 },
      },
    },
  };

  const validDateRange =
    dateRange && dateRange[0] && dateRange[1] ? dateRange : null;
  const { data } = useGenerateChartData(validDateRange);

  return (
    <div>
      <div className='flex items-center justify-between v gap-4 mb-5'>
        <p className="text-body-2 sm:text-heading-6 font-medium text-ny-primary-500">
          909 Transaction This Month
        </p>
        <div className='flex items-center gap-1'>
          <img src={ArrowUp} alt="Arrow" />
          <p className='text-heading-6 font-medium text-ny-success-500'>70</p>
        </div>
      </div>
      <Line className="!max-h-[306px]" options={options} data={data} />
    </div>
  )
};

export default LineChart;
