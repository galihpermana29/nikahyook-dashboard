import PageTitle from '@/shared/view/presentations/page-title/PageTitle';
import ChatSidebar from './view/container/ChatSidebar/ChatSidebar';
import ChatRoom from './view/container/ChatRoom/ChatRoom';

export default function VendorChatContainer() {
  return (
    <>
      <PageTitle title="Vendor Chat" />

      <div className="flex items-start gap-6">
        <ChatSidebar />
        <ChatRoom />
      </div>
    </>
  );
}
