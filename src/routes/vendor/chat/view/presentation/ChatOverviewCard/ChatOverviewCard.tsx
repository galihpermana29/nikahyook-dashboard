import type { TListChats } from '@/shared/models/chatInterfaces';
import { Avatar } from 'antd';
import dayjs from 'dayjs';
import useChatRecipientId from '../../../usecase/useChatRecipientId';

interface IChatOverviewCardProps {
  chat: TListChats;
}

export default function ChatOverviewCard({ chat }: IChatOverviewCardProps) {
  const { recipientId, setIds } = useChatRecipientId();
  const isSelected = recipientId ? chat.userInfo.uid === recipientId : false;

  return (
    <div
      onClick={() => setIds({ recipientId: chat.userInfo.uid })}
      className={`flex items-center gap-3 hover:cursor-pointer p-3 rounded-xl ${
        isSelected && 'bg-ny-gray-100/35'
      }`}>
      <Avatar
        shape="circle"
        src={chat.userInfo.displayPicture}
        className="size-[50px] shrink-0"
      />

      <div className="flex flex-col gap-1 w-full overflow-hidden">
        <div className="flex items-center justify-between overflow-hidden">
          <span className="text-caption-1 font-medium text-ellipsis line-clamp-1">
            {chat.userInfo.displayName}
          </span>

          <span className="font-semibold text-[10px]">
            {dayjs(chat.date.toDate()).format('HH.mm')}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span
            className={`text-caption-2 line-clamp-1 ${
              chat.lastMessage.isRead ? 'text-ny-gray-400' : ''
            }`}>
            {chat.lastMessage.text}
          </span>

          {!chat.lastMessage.isRead && (
            <div className="rounded-full size-3 shrink-0 bg-ny-primary-500" />
          )}
        </div>
      </div>
    </div>
  );
}
