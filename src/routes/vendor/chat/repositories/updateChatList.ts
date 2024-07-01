import { Timestamp, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../../../firebase-config';
import type {
  ICreateUserPayloadRoot,
  IDetailAdminUser,
  IDetailVendorUser,
} from '@/shared/models/userServicesInterface';

type TUpdateChatListParams = {
  recipientId: string;
  recipient: ICreateUserPayloadRoot<IDetailAdminUser | IDetailVendorUser>;
  senderId: string;
  sender: ICreateUserPayloadRoot<IDetailAdminUser | IDetailVendorUser>;
  text: string;
};

export default async function updateChatList(params: TUpdateChatListParams) {
  const combinedId: string = params.recipientId + '.' + params.senderId;

  await updateDoc(doc(db, 'userChats', params.recipientId), {
    [combinedId + '.userInfo']: {
      uid: params.senderId,
      displayName: params.sender.name,
      displayPicture: params.sender.profile_image_uri,
    },
    [combinedId + '.date']: Timestamp.now(),
    [combinedId + '.lastMessage']: {
      text: params.text,
      isRead: false,
    },
  });

  await updateDoc(doc(db, 'userChats', params.senderId), {
    [combinedId + '.userInfo']: {
      uid: params.recipientId,
      displayName: params.recipient.name,
      displayPicture: params.recipient.profile_image_uri,
    },
    [combinedId + '.date']: Timestamp.now(),
    [combinedId + '.lastMessage']: {
      text: params.text,
      isRead: true,
    },
  });
}
