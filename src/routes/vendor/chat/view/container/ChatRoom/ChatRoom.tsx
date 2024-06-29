import UserInformation from '../../presentation/UserInformation/UserInformation';
import useQueryDetailUser from '@/shared/view/container/general-layout/repositories/useQueryDetailUser';
import ErrorBoundary from '@/shared/view/container/error-boundary/ErrorBoundary';
import type { AxiosError } from 'axios';
import UserInformationLoading from '../../presentation/UserInformation/UserInformationLoading';
import ChatBubble from '../../presentation/ChatBubble/ChatBubble';
import groupChatMessagesByDate from '../../../repositories/groupChatMessagesByDate';
import DateDivider from '../../presentation/DateDivider/DateDivider';
import useQueryBubbleChats from '../../../usecase/useQueryBubbleChats';
import SendChatArea from '../SendChatArea/SendChatArea';
import LoadingHandler from '@/shared/view/container/loading/Loading';
import SendChatAreaLoading from '../SendChatArea/SendChatAreaLoading';
import EmptyChatRoom from '../../presentation/EmptyChatRoom/EmptyChatRoom';

export default function ChatRoom({
  selectedChat,
}: {
  selectedChat: string | null;
}) {
  // TODO: maybe provide a custom view when there's no selected chat
  if (!selectedChat) return <EmptyChatRoom />;

  const {
    data,
    isLoading: userIsLoading,
    error: userError,
    refetch,
  } = useQueryDetailUser(selectedChat);
  const { allChat } = useQueryBubbleChats(selectedChat);
  const chats = groupChatMessagesByDate(allChat);

  return (
    <div className="w-full px-5 min-h-screen relative flex flex-col">
      <div className="flex flex-col gap-2 w-full overflow-y-scroll flex-grow">
        <ErrorBoundary refetch={refetch} error={userError as AxiosError}>
          <LoadingHandler
            loadingComponent={<UserInformationLoading />}
            isLoading={userIsLoading}>
            <UserInformation user={data} />
          </LoadingHandler>
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

      <ErrorBoundary refetch={refetch} error={userError as AxiosError}>
        <LoadingHandler
          loadingComponent={<SendChatAreaLoading />}
          isLoading={userIsLoading}>
          <SendChatArea recipientId={selectedChat} />
        </LoadingHandler>
      </ErrorBoundary>
    </div>
  );
}
