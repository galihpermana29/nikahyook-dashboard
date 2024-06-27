import type { TMessages } from '@/shared/models/chatInterfaces';
import { useEffect, useState } from 'react';
import getBubbleChats from '../repositories/getBubbleChats';

export default function useQueryBubbleChats(userId: string | null) {
  const [allChat, setAllChat] = useState<TMessages[]>([]);

  useEffect(() => {
    userId && getBubbleChats({ setChatState: setAllChat, userId });
  }, [userId]);

  return { allChat };
}
