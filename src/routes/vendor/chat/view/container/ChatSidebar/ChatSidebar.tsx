import { Input } from 'antd';
import useQueryChats from '../../../usecase/useQueryChats';
import ChatOverviewCard from '../../presentation/ChatOverviewCard/ChatOverviewCard';
import EmptySection from '../../presentation/EmptySection/EmptySection';

export default function ChatSidebar({
  selected,
  setSelectedChat,
}: {
  selected: string | null;
  setSelectedChat: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const { listAllChat, searchChats } = useQueryChats(selected);

  return (
    <aside className="flex flex-col gap-2 overflow-y-scroll w-full max-w-80">
      <Input
        onChange={(e) => searchChats(e.currentTarget.value)}
        placeholder="Search by username..."
      />

      {listAllChat.render.length > 0 ? (
        listAllChat.render.map((chat) => {
          return (
            <ChatOverviewCard
              chat={chat}
              selected={selected}
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
