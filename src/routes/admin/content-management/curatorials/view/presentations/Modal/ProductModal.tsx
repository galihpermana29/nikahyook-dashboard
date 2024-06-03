import { Form, type FormInstance } from 'antd';

interface IFormProduct {
  form: FormInstance<any>;
  fieldName: string;
  footer: React.ReactNode;
}

export default function ProductModal({ form, footer }: IFormProduct) {
  return <Form form={form}>ProductModal {footer}</Form>;
}
