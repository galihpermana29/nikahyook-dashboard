import { db } from '@/../firebase-config';
import type { TListChats } from '@/shared/models/chatInterfaces';
import useClientSession from '@/shared/usecase/useClientSession';
import { doc, onSnapshot } from 'firebase/firestore';
import type { IAllChatState } from '../models/allChatState';
import type { SetStateAction } from 'react';

type TGetChatsParams = {
  setChatState: React.Dispatch<SetStateAction<IAllChatState>>;
};

export default function getChats(params: TGetChatsParams) {
  const userSession = useClientSession();
  if (!userSession) return;

  const unsub = onSnapshot(doc(db, 'userChats', userSession.user_id), (doc) => {
    const allListChats = doc.data()
      ? (doc.data() as Record<string, Record<string, TListChats>>)
      : null;

    const listAllChat = allListChats
      ? Object.values(allListChats)
          .flatMap(Object.values)
          .sort(
            (a: TListChats, b: TListChats) =>
              b.date.toDate().getTime() - a.date.toDate().getTime()
          )
      : [];

    params.setChatState({
      original: listAllChat as unknown as TListChats[],
      render: listAllChat as unknown as TListChats[],
    });
  });

  return () => {
    unsub();
  };
}
