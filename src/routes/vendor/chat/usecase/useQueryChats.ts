import { useEffect, useState } from 'react';
import type { IAllChatState } from '../models/allChatState';
import useClientSession from '@/shared/usecase/useClientSession';
import getChats from '../repositories/getChats';
import setChatRead from '../repositories/setChatRead';

export default function useQueryChats(selected: string | null) {
  const session = useClientSession();

  const [listAllChat, setListAllChat] = useState<IAllChatState>({
    original: [],
    render: [],
  });

  const getChatBySenderId = (selectedId: string) => {
    const chat = listAllChat.render.find((chat) => {
      return chat.userInfo.uid === selectedId;
    });

    return chat;
  };

  const searchChats = (keyword: string) => {
    const result = listAllChat.original.filter((message) =>
      message.userInfo.displayName.toLowerCase().includes(keyword.toLowerCase())
    );

    return setListAllChat((message) => ({ ...message, render: result }));
  };

  useEffect(() => {
    session && getChats({ setChatState: setListAllChat });
    if (selected !== null) {
      const chat = getChatBySenderId(selected);
      if (!chat) return;

      setChatRead({ chat });
    }
  }, [session?.user_id, selected]);

  return { listAllChat, searchChats };
}
