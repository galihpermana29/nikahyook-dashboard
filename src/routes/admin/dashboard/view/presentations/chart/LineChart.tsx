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
import { IDashboardTransaction } from '@/shared/models/dashboardStatisticsInterfaces';
import { Line } from 'react-chartjs-2';
import { useGenerateChartData } from '../../../usecase/useGenerateChartData';
import dayjs from 'dayjs';
import LoadingHandler from '@/shared/view/container/loading/Loading';

interface ILineChart {
  dateRange: [dayjs.Dayjs, dayjs.Dayjs] | null;
  total_transaction: number;
  transactions: IDashboardTransaction[];
  isLoading: boolean;
}

const LineChart = ({
  dateRange,
  total_transaction,
  transactions,
  isLoading,
}: ILineChart) => {
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

  const { data: chartData } = useGenerateChartData(dateRange, transactions);

  return (
    <div>
      <p className="text-body-2 sm:text-heading-6 font-medium text-ny-primary-500 mb-4">
        {total_transaction} Transaction This Month
      </p>
      <LoadingHandler
        isLoading={isLoading}
        fullscreen={false}
        classname="h-[306px]"
      >
        <Line className="!max-h-[306px]" options={options} data={chartData} />
      </LoadingHandler>
    </div>
  );
};

export default LineChart;
