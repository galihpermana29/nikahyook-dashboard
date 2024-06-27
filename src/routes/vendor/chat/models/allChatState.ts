import type { TListChats } from '@/shared/models/chatInterfaces';

export interface IAllChatState {
  original: TListChats[];
  render: TListChats[];
}
