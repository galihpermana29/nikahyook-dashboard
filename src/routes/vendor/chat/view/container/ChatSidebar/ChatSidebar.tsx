import { Input } from 'antd';
import useQueryChats from '../../../usecase/useQueryChats';
import ChatOverviewCard from '../../presentation/ChatOverviewCard/ChatOverviewCard';
import EmptySection from '../../presentation/EmptySection/EmptySection';

export default function ChatSidebar({
  setSelectedChat,
}: {
  setSelectedChat: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const { listAllChat, searchChats } = useQueryChats();

  return (
    <aside className="flex flex-col gap-5">
      <Input
        onChange={(e) => searchChats(e.currentTarget.value)}
        placeholder="Search by username..."
      />

      {listAllChat.render.length > 0 ? (
        listAllChat.render.map((chat) => {
          return (
            <ChatOverviewCard
              chat={chat}
              setSelected={setSelectedChat}
              key={chat.userInfo.uid}
            />
          );
        })
      ) : (
        <EmptySection message="There are no messages" />
      )}
    </aside>
  );
}
