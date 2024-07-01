import { Input } from 'antd';
import useQueryChats from '../../../usecase/useQueryChats';
import ChatOverviewCard from '../../presentation/ChatOverviewCard/ChatOverviewCard';
import EmptySection from '../../presentation/EmptySection/EmptySection';
import useChatRecipientId from '../../../usecase/useChatRecipientId';

export default function ChatSidebar() {
  const { recipientId } = useChatRecipientId();
  const { listAllChat, searchChats } = useQueryChats(recipientId);

  return (
    <aside className="flex flex-col gap-2 overflow-y-scroll w-full max-w-80 sticky top-4">
      <Input
        onChange={(e) => searchChats(e.currentTarget.value)}
        placeholder="Search by username..."
      />

      {listAllChat.render.length > 0 ? (
        listAllChat.render.map((chat) => {
          return <ChatOverviewCard chat={chat} key={chat.userInfo.uid} />;
        })
      ) : (
        <EmptySection message="There are no messages" />
      )}
    </aside>
  );
}
