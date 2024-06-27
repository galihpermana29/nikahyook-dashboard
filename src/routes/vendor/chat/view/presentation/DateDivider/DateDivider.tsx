import { Divider } from 'antd';
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
dayjs.extend(calendar);

export default function DateDivider({ date }: { date: string }) {
  const dayjsCalendarConfig = {
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    nextWeek: '[Next] dddd', // Next sunday
    lastDay: '[Yesterday]',
    lastWeek: '[Last] dddd', // Last monday
    sameElse: 'DD/MM/YYYY', // Everything else ( 7/10/2011 )
  };

  return (
    <Divider className="my-0 py-0" plain>
      {dayjs(date).calendar(dayjs(), dayjsCalendarConfig)}
    </Divider>
  );
}
