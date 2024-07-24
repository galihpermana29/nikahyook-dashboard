/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ISendMessagePayload } from '@/shared/models/chatInterfaces';
import type { FormInstance } from 'antd';
import sendChatToUser from '../repositories/sendChatToUser';
import updateChatList from '../repositories/updateChatList';
import useClientSession from '@/shared/usecase/useClientSession';
import useQueryDetailUser from '@/shared/view/container/general-layout/repositories/useQueryDetailUser';
import { UseMutateFunction } from 'react-query';
import {
  ICreateNotificationPayload,
  ICreateNotificationResponseRoot,
} from '@/shared/models/notificationServiceInterfaces';
import { AxiosError } from 'axios';

type TUseSendChatParams = {
  recipientId: string | null;
  form: FormInstance<ISendMessagePayload>;
  onNotify: UseMutateFunction<
    ICreateNotificationResponseRoot,
    AxiosError<unknown, any>,
    ICreateNotificationPayload,
    unknown
  >;
};

export default function useSendChat(params: TUseSendChatParams) {
  const session = useClientSession();
  const { data: recipient } = useQueryDetailUser(params.recipientId ?? '');
  const { data: sender } = useQueryDetailUser(session?.user_id ?? '');

  const sendChat = async (input: ISendMessagePayload) => {
    if (!params.recipientId || !session || !sender || !recipient) return;

    const sentChat = await sendChatToUser(params.recipientId, input.message);
    await updateChatList({
      senderId: session.user_id,
      sender,
      recipientId: params.recipientId,
      recipient,
      text: input.message,
    });

    params.onNotify({
      title: 'New message arrived!',
      description: `${sender.name} sent you a message!`,
      user_id: params.recipientId,
    });

    return sentChat;
  };

  return { sendChat };
}
