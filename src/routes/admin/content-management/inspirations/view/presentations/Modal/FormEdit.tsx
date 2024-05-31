import { Form, type FormInstance } from 'antd';

interface IFormEdit {
  form: FormInstance<any>;
  footer: React.ReactNode;
  // TODO: change this to useMutate from API
  //   handleMutate: UseMutateFunction<
  //     ICreateUserResponseRoot,
  //     AxiosError<unknown, any>,
  //     ICreateUserPayloadRoot,
  //     unknown
  //   >;
}

export default function FormEdit({ form, footer }: IFormEdit) {
  return (
    <Form form={form} layout="vertical">
      {footer}
    </Form>
  );
}
