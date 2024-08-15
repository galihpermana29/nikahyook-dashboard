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
  const parsedDate = dayjs.utc(dateString, 'DD-MM-YYYY HH:mm:ss');

  const relativeTimeString = dayjs(parsedDate).fromNow();

  return relativeTimeString;
};
