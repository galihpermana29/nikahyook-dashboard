import type { TMessages } from '@/shared/models/chatInterfaces';
import useClientSession from '@/shared/usecase/useClientSession';
import QuotedCard from '../QuotedCard/QuotedCard';
import ChatBubbleSenderInformation from './ChatBubbleSenderInformation';

export default function ChatBubble({ chat }: { chat: TMessages }) {
  const clientSession = useClientSession();
  const senderIsUser = chat.senderId === clientSession?.user_id;

  if (!clientSession) throw new Error('No session detected!');

  return (
    <div className={`flex flex-col ${chat.product ? 'gap-[10px]' : null}`}>
      <div>
        {chat.product && (
          <div
            className={`w-full flex flex-col gap-2 ${
              senderIsUser ? 'ml-auto items-end' : 'mr-auto items-start'
            }`}>
            <ChatBubbleSenderInformation
              isFromUser={senderIsUser}
              timestamp={chat.timeStamp}
              senderId={chat.senderId}
            />

            <QuotedCard
              product={JSON.parse(chat.product)}
              closeComponent={null}
            />
          </div>
        )}
      </div>

      <div
        className={`flex flex-col gap-2 ${
          senderIsUser ? 'ml-auto items-end' : 'mr-auto items-start'
        }`}>
        {!chat.product && (
          <ChatBubbleSenderInformation
            isFromUser={senderIsUser}
            timestamp={chat.timeStamp}
            senderId={chat.senderId}
          />
        )}

        <div
          className={`flex items-end max-w-64 p-3 gap-[10px] rounded-lg text-caption-2 ${
            senderIsUser ? 'bg-ny-primary-100' : 'bg-ny-gray-100'
          }`}>
          {chat.text}
        </div>
      </div>
    </div>
  );
}
