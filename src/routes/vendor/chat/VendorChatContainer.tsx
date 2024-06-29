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

      <div className="flex items-start gap-6">
        <ChatSidebar
          selected={selectedChat}
          setSelectedChat={setSelectedChat}
        />

        <ChatRoom selectedChat={selectedChat} />
      </div>
    </>
  );
}
