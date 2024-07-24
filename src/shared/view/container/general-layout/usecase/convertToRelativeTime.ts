import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

export default (dateString: string) => {
  const hasTime = dateString.split(' ').length > 1;
  const format = hasTime ? 'DD-MM-YYYY hh:mm:ss' : 'DD-MM-YYYY';
  const parsedDate = dayjs(dateString, format).utc();
  const relativeTimeString = parsedDate.fromNow();

  return relativeTimeString;
};
