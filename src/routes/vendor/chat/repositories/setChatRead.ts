import useClientSession from '@/shared/usecase/useClientSession';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../../../firebase-config';
import type { TListChats } from '@/shared/models/chatInterfaces';

type TSetChatReadParams = {
  chat: TListChats;
};

const setChatRead = async ({ chat }: TSetChatReadParams) => {
  const session = useClientSession();
  if (!session) return;

  const combinedId: string = chat.userInfo.uid + '.' + session.user_id;

  await updateDoc(doc(db, 'userChats', session.user_id), {
    [combinedId + '.userInfo']: {
      ...chat.userInfo,
    },
    [combinedId + '.date']: chat.date,
    [combinedId + '.lastMessage']: {
      ...chat.lastMessage,
      isRead: true,
    },
  });
};

export default setChatRead;
