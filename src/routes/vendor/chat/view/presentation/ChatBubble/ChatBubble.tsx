import type { TMessages } from '@/shared/models/chatInterfaces';
import dayjs from 'dayjs';
import useClientSession from '@/shared/usecase/useClientSession';
import QuotedCard from '../QuotedCard/QuotedCard';

export default function ChatBubble({ chat }: { chat: TMessages }) {
  const clientSession = useClientSession();
  if (!clientSession) throw new Error('No session detected!');

  return (
    <div className={`flex flex-col ${chat.product ? 'gap-[10px]' : null}`}>
      <div>
        {chat.product && (
          <QuotedCard
            product={JSON.parse(chat.product)}
            closeComponent={null}
          />
        )}
      </div>

      <div
        className={`flex items-end max-w-64 p-3 gap-[10px] rounded-lg text-caption-2 ${
          chat.senderId === clientSession.user_id
            ? 'ml-auto bg-ny-primary-100'
            : 'mr-auto bg-ny-gray-100'
        }`}>
        <span>{chat.text}</span>
        <span className="text-ny-gray-400">
          {dayjs(chat.timeStamp).format('HH.mm')}
        </span>
      </div>
    </div>
  );
}
