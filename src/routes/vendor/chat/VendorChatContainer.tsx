import PageTitle from '@/shared/view/presentations/page-title/PageTitle';
import ChatSidebar from './view/container/ChatSidebar/ChatSidebar';
import ChatRoom from './view/container/ChatRoom/ChatRoom';
import { useState } from 'react';

export default function VendorChatContainer() {
  // selected chat in form of user id
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  return (
    <>
      <PageTitle title="Vendor Chat" />

      <div className="grid grid-cols-[30%_70%] gap-8">
        <ChatSidebar setSelectedChat={setSelectedChat} />
        <div className="flex flex-col">
          <ChatRoom selectedChat={selectedChat} />
        </div>
      </div>
    </>
  );
}
