import type { ISendMessagePayload } from '@/shared/models/chatInterfaces';
import { Button, Form, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';
import FormItem from 'antd/es/form/FormItem';
import useSendChat from '../../../usecase/useSendChat';

type TSendChatAreaProps = {
  recipientId: string;
};

export default function SendChatArea(props: TSendChatAreaProps) {
  const [form] = useForm();
  const { sendChat } = useSendChat({ form, recipientId: props.recipientId });

  const onFinish = (values: ISendMessagePayload) => {
    sendChat(values);
    form.resetFields();
  };

  return (
    <Form<ISendMessagePayload>
      form={form}
      onFinish={onFinish}
      className="w-full flex items-center gap-5 sticky bottom-0 pt-5 bg-white">
      <FormItem className="w-full my-0" name="message">
        <Input placeholder="Type your message" className="w-full" />
      </FormItem>
      <Button htmlType="submit" type="primary">
        Send
      </Button>
    </Form>
  );
}
