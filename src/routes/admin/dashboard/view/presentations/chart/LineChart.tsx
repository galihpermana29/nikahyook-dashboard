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

  return <Line className="!max-h-[306px]" options={options} data={data} />;
};

export default LineChart;
