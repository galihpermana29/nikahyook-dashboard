import { ChartData } from 'chart.js';
import { IDashboardTransaction } from '@/shared/models/dashboardStatisticsInterfaces';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';

export const useGenerateChartData = (
  dateRange: [dayjs.Dayjs, dayjs.Dayjs] | null,
  transactions: IDashboardTransaction[]
) => {
  const [chartData, setChartData] = useState<ChartData<'line'>>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const [startDate, endDate] =
      dateRange && dateRange[0] && dateRange[1]
        ? dateRange
        : [dayjs().subtract(6, 'day'), dayjs()];

    const sortedTransactions = transactions
      .sort((a, b) =>
        dayjs(a.date, 'DD-MM-YYYY').diff(dayjs(b.date, 'DD-MM-YYYY'))
      )
      .filter((t) => {
        const transactionDate = dayjs(t.date, 'DD-MM-YYYY');
        return (
          (transactionDate.isAfter(startDate) ||
            transactionDate.isSame(startDate)) &&
          (transactionDate.isBefore(endDate) || transactionDate.isSame(endDate))
        );
      });

    const labels = sortedTransactions.map((t) =>
      dayjs(t.date, 'DD-MM-YYYY').format('DD/MM')
    );
    const data = sortedTransactions.map((t) => t.total_transaction);

    setChartData({
      labels,
      datasets: [
        {
          data,
          borderColor: '#FF4B99',
          backgroundColor: (context) => {
            const bgColor = [
              'rgba(255, 75, 153, 0.5)',
              'rgba(230, 11, 106, 0.1)',
            ];

            if (!context.chart.chartArea) return;

            const {
              ctx,
              chartArea: { top, bottom },
            } = context.chart;
            const gradientBg = ctx.createLinearGradient(0, top, 0, bottom);

            gradientBg.addColorStop(0, bgColor[0]);
            gradientBg.addColorStop(1, bgColor[1]);

            return gradientBg;
          },
          fill: 'start',
          borderWidth: 4,
          tension: 0.2,
        },
      ],
    });
  }, [dateRange, transactions]);

  return { data: chartData };
};
