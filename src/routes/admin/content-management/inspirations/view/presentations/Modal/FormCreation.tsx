import { Form, type FormInstance } from 'antd';

interface IFormCreation {
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

export default function FormCreation({ form, footer }: IFormCreation) {
  return (
    <Form form={form} layout="vertical">
      {footer}
    </Form>
  );
}
