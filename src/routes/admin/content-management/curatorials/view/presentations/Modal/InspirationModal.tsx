import { Form, type FormInstance } from 'antd';

interface IFormInspiration {
  form: FormInstance<any>;
  fieldName: string;
  footer: React.ReactNode;
}

export default function InspirationModal({ form, footer }: IFormInspiration) {
  return <Form form={form}>Inspiration modal {footer}</Form>;
}
