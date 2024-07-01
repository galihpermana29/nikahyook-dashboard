import type { ISendMessagePayload } from '@/shared/models/chatInterfaces';
import { Button, Form } from 'antd';
import { useForm } from 'antd/es/form/Form';
import FormItem from 'antd/es/form/FormItem';
import useSendChat from '../../../usecase/useSendChat';
import useChatRecipientId from '../../../usecase/useChatRecipientId';
import TextArea from 'antd/es/input/TextArea';

export default function SendChatArea() {
  const { recipientId } = useChatRecipientId();

  const [form] = useForm();
  const { sendChat } = useSendChat({ form, recipientId });

  const onFinish = (values: ISendMessagePayload) => {
    sendChat(values);
    form.resetFields();
  };

  // prevent pressing enter to make a new line in the text area
  const handleTextAreaKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      form.submit();
    }
  };

  return (
    <Form<ISendMessagePayload>
      form={form}
      onFinish={onFinish}
      className="w-full flex items-center gap-5 sticky bottom-0 pt-5 bg-white">
      <FormItem className="w-full my-0" name="message">
        <TextArea
          autoSize
          placeholder="Type your message"
          className="w-full"
          onKeyDown={handleTextAreaKeyDown}
        />
      </FormItem>

      <Button htmlType="submit" type="primary">
        Send
      </Button>
    </Form>
  );
}
