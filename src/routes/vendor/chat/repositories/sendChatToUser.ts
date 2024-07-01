import { Timestamp, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../../../firebase-config';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import useClientSession from '@/shared/usecase/useClientSession';

export default async function sendChatToUser(
  recipientId: string,
  text: string
) {
  const session = useClientSession();
  if (!session) return;

  const combinedId: string = recipientId + '.' + session.user_id;

  const data = await updateDoc(doc(db, 'chats', combinedId), {
    messages: arrayUnion({
      id: uuidv4(),
      text: text,
      senderId: session.user_id.toString(),
      date: Timestamp.now(),
      product: null,
      timeStamp: dayjs().toString(),
    }),
  });

  return data;
}
