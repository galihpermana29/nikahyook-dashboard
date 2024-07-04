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
import useChatRecipientId from '../../../usecase/useChatRecipientId';
import { useEffect, useRef } from 'react';

export default function ChatRoom() {
  const { recipientId } = useChatRecipientId();
  const ref: any = useRef();

  const {
    data,
    isLoading: userIsLoading,
    error: userError,
    refetch,
  } = useQueryDetailUser(recipientId ?? '');
  const { allChat } = useQueryBubbleChats(recipientId);
  const chats = groupChatMessagesByDate(allChat);

  useEffect(() => {
    if (ref?.current) {
      ref.current!.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }, [chats]);

  if (!recipientId) return <EmptyChatRoom />;

  return (
    <div className="w-full px-5 min-h-screen relative flex flex-col">
      <div className="flex flex-col first:gap-0 gap-2 w-full flex-grow first:-mt-4">
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
                <div key={chat.id} ref={ref}>
                  <ChatBubble chat={chat} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <ErrorBoundary refetch={refetch} error={userError as AxiosError}>
        <LoadingHandler
          loadingComponent={<SendChatAreaLoading />}
          isLoading={userIsLoading}>
          <SendChatArea />
        </LoadingHandler>
      </ErrorBoundary>
    </div>
  );
}
