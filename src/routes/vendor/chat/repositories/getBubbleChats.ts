import type { TFirebaseChats, TMessages } from '@/shared/models/chatInterfaces';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/../firebase-config';
import useClientSession from '@/shared/usecase/useClientSession';

type TGetBubbleChatsParams = {
  chatmateId: string;
  setChatState: React.Dispatch<React.SetStateAction<TMessages[]>>;
};

export default function getBubbleChats(params: TGetBubbleChatsParams) {
  const session = useClientSession();
  if (!session || !params.chatmateId) return { allChat: [] };

  const combinedId = params.chatmateId + '.' + session.user_id;

  const unsub = onSnapshot(doc(db, 'chats', combinedId), (doc) => {
    const result = doc.data() as TFirebaseChats;
    doc.exists() && params.setChatState(result?.messages);
  });

  return () => {
    unsub();
  };
}
