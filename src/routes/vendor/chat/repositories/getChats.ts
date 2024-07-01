import { db } from '@/../firebase-config';
import type { TListChats } from '@/shared/models/chatInterfaces';
import useClientSession from '@/shared/usecase/useClientSession';
import { doc, onSnapshot } from 'firebase/firestore';
import type { IAllChatState } from '../models/allChatState';
import type { SetStateAction } from 'react';
import useConvertTimestamp from '../usecase/useConvertTimestamp';

type TGetChatsParams = {
  setChatState: React.Dispatch<SetStateAction<IAllChatState>>;
};

export default function getChats(params: TGetChatsParams) {
  const session = useClientSession();
  if (!session) return;

  // take chats received for current session's user
  const unsub = onSnapshot(doc(db, 'userChats', session.user_id), (doc) => {
    const allListChats = doc.data()
      ? (doc.data() as Record<string, Record<string, TListChats>>)
      : null;

    const listAllChat = allListChats
      ? Object.values(allListChats)
          // get the actual chat informations
          .flatMap(Object.values)
          .map((value: TListChats) => {
            // convert timestamp object like to actual Timestamp type
            const timestamp = useConvertTimestamp(value.date);
            return { ...value, date: timestamp };
          })
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
