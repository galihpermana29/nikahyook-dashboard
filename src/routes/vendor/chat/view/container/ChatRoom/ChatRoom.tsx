import UserInformation from '../../presentation/UserInformation/UserInformation';
import useQueryDetailUser from '@/shared/view/container/general-layout/repositories/useQueryDetailUser';
import ErrorBoundary from '@/shared/view/container/error-boundary/ErrorBoundary';
import type { AxiosError } from 'axios';
import UserInformationLoading from '../../presentation/UserInformation/UserInformationLoading';
import ChatBubble from '../../presentation/ChatBubble/ChatBubble';
import groupChatMessagesByDate from '../../../repositories/groupChatMessagesByDate';
import DateDivider from '../../presentation/DateDivider/DateDivider';
import useQueryBubbleChats from '../../../usecase/useQueryBubbleChats';

export default function ChatRoom({
  selectedChat,
}: {
  selectedChat: string | null;
}) {
  // TODO: maybe provide a custom view when there's no selected chat
  if (!selectedChat) return null;

  const {
    data,
    isLoading: userIsLoading,
    error: userError,
    refetch,
  } = useQueryDetailUser(selectedChat);
  const { allChat } = useQueryBubbleChats(selectedChat);
  const chats = groupChatMessagesByDate(allChat);

  return (
    <div className="flex flex-col gap-2 w-full overflow-y-scroll">
      <ErrorBoundary refetch={refetch} error={userError as AxiosError}>
        <UserInformationLoading isLoading={userIsLoading}>
          <UserInformation user={data} />
        </UserInformationLoading>
      </ErrorBoundary>

      {Object.keys(chats).map((date) => (
        <div className="flex flex-col gap-2" key={date}>
          <DateDivider date={date} />

          <div className="flex flex-col gap-5">
            {chats[date].map((chat) => (
              <ChatBubble key={chat.id} chat={chat} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
