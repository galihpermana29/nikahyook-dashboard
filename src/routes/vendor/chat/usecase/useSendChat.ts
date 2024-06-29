import type { ISendMessagePayload } from '@/shared/models/chatInterfaces';
import type { FormInstance } from 'antd';
import sendChatToUser from '../repositories/sendChatToUser';
import updateChatList from '../repositories/updateChatList';
import useClientSession from '@/shared/usecase/useClientSession';
import useQueryDetailUser from '@/shared/view/container/general-layout/repositories/useQueryDetailUser';

type TUseSendChatParams = {
  recipientId: string;
  form: FormInstance<ISendMessagePayload>;
};

export default function useSendChat(params: TUseSendChatParams) {
  const session = useClientSession();
  const { data: recipient } = useQueryDetailUser(params.recipientId);
  const { data: sender } = useQueryDetailUser(session?.user_id ?? '');

  if (!recipient || !session || !sender)
    throw new Error('No recipient or session detected!');

  const sendChat = async (input: ISendMessagePayload) => {
    const sentChat = await sendChatToUser(params.recipientId, input.message);
    await updateChatList({
      senderId: session.user_id,
      sender,
      recipientId: params.recipientId,
      recipient,
      text: input.message,
    });

    return sentChat;
  };

  return { sendChat };
}
