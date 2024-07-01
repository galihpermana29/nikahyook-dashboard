import type { TMessages } from '@/shared/models/chatInterfaces';
import dayjs from 'dayjs';

export default function groupChatMessagesByDate(messages: TMessages[]): {
  [date: string]: TMessages[];
} {
  const groupedMessages: { [date: string]: TMessages[] } = {};

  messages.forEach((message) => {
    const date = dayjs(message.timeStamp).format('YYYY-MM-DD');

    if (!groupedMessages[date]) {
      groupedMessages[date] = [];
    }

    groupedMessages[date].push(message);
  });

  return groupedMessages;
}
