import type { TMessages } from '@/shared/models/chatInterfaces';
import { useEffect, useState } from 'react';
import getBubbleChats from '../repositories/getBubbleChats';

export default function useQueryBubbleChats(chatmateId: string | null) {
  const [allChat, setAllChat] = useState<TMessages[]>([]);

  useEffect(() => {
    chatmateId && getBubbleChats({ setChatState: setAllChat, chatmateId });
  }, [chatmateId]);

  return { allChat };
}
