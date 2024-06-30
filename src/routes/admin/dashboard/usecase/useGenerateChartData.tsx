import { useState, useEffect } from 'react';
import { ChartData } from 'chart.js';
import dayjs from 'dayjs';

export const useGenerateChartData = (
  dateRange: [dayjs.Dayjs, dayjs.Dayjs] | null
) => {
  const [chartData, setChartData] = useState<ChartData<'line'>>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const generateLabels = (start: dayjs.Dayjs, end: dayjs.Dayjs) => {
      const labels: string[] = [];
      let currentDate = start.clone();

      while (currentDate.isBefore(end) || currentDate.isSame(end, 'day')) {
        labels.push(currentDate.format('DD/MM'));
        currentDate = currentDate.add(1, 'day');
      }

      return labels;
    };

    const generateRandomData = (length: number) => {
      return Array.from(
        { length },
        () => Math.floor(Math.random() * 1000) + 300
      );
    };

    const [startDate, endDate] =
      dateRange && dateRange[0] && dateRange[1]
        ? dateRange
        : [dayjs().subtract(6, 'day'), dayjs()];
    const labels = generateLabels(startDate, endDate);
    const data = generateRandomData(labels.length);

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
  }, [dateRange]);

  return { data: chartData };
};
