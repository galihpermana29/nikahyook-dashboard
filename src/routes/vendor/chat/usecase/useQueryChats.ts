import { useEffect, useState } from 'react';
import type { IAllChatState } from '../models/allChatState';
import useClientSession from '@/shared/usecase/useClientSession';
import getChats from '../repositories/getChats';

export default function useQueryChats() {
  const userSession = useClientSession();

  const [listAllChat, setListAllChat] = useState<IAllChatState>({
    original: [],
    render: [],
  });

  const searchChats = (keyword: string) => {
    const result = listAllChat.original.filter((dx) =>
      dx.userInfo.displayName.toLowerCase().includes(keyword.toLowerCase())
    );

    return setListAllChat((dx) => ({ ...dx, render: result }));
  };

  useEffect(() => {
    userSession && getChats({ setChatState: setListAllChat });
  }, [userSession?.user_id]);

  return { listAllChat, searchChats };
}
