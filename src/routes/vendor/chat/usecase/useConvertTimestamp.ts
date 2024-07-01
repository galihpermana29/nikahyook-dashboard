import type { TChatDate } from '@/shared/models/chatInterfaces';
import { Timestamp } from 'firebase/firestore';

type TUseConvertTimestampParams = TChatDate;

export default function useConvertTimestamp(
  params: TUseConvertTimestampParams
) {
  const { seconds, nanoseconds } = params;

  const timestamp = new Timestamp(seconds, nanoseconds);
  return timestamp;
}
