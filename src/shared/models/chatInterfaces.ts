import type { Timestamp } from 'firebase/firestore';

export type TMessages = {
  date: unknown;
  id: string;
  product: string;
  senderId: string;
  text: string;
  timeStamp: string;
};

export type TChatDate = {
  seconds: number;
  nanoseconds: number;
};

export interface TListChatsQueryData extends Omit<TListChats, 'date'> {
  date: TChatDate;
}

export type TListChats = {
  date: Timestamp;
  lastMessage: {
    isRead: boolean;
    text: string;
  };
  userInfo: {
    displayName: string;
    displayPicture: string;
    uid: string;
  };
};

export type TFirebaseChats = {
  messages: TMessages[];
};

export interface ISendMessagePayload {
  message: string;
}
