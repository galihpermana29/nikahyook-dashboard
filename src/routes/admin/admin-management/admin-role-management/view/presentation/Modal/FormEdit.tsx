import {
  IAllRolesData,
  ICreateRoleResponseRoot,
  IUpdateRolePayloadRoot,
} from '@/shared/models/roleServicesInterface';
import { Cascader, Form, FormInstance, Input } from 'antd';
import { AxiosError } from 'axios';
import { UseMutateFunction } from 'react-query';
import { useGenerateCascaderOptions } from '../../../usecase/useGenerateCascaderOptions';
import useGenerateModalProps from '../../../usecase/useGenerateModalProps';

interface IFormEdit {
  form: FormInstance;
  handleMutate: UseMutateFunction<
    ICreateRoleResponseRoot,
    AxiosError,
    {
      payload: IUpdateRolePayloadRoot;
      id: string;
      type: 'delete' | 'update';
    },
    unknown
  >;
  footer: React.ReactNode;
  id?: string;
  detail: IAllRolesData | undefined;
}

const FormEdit = ({ form, handleMutate, footer, id, detail }: IFormEdit) => {
  const { transformToPayload, transformToCascaderData } = useGenerateModalProps();
  const { options } = useGenerateCascaderOptions();
  
  const defaultValue = detail ? transformToCascaderData(detail) : { name: '', permissions_edit: [] };

  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        initialValues={defaultValue}
        onFinish={(value) => {
          handleMutate!({
            payload: transformToPayload(value),
            id: id!,
            type: 'update',
          });
        }}
      >
        <div className="flex gap-[20px]">
          <div className="flex-1">
            <Form.Item
              className="my-[8px]"
              name={'name'}
              label="Role"
              rules={[
                {
                  required: true,
                  message: 'Please input role name!',
                },
              ]}>
              <Input
                placeholder="Enter your detail here"
                className="h-[40px] rounded-[8px] text-caption-1 font-[400]"
              />
            </Form.Item>
            <Form.Item
              name={'permissions_edit'}
              label={
                <div>
                  <div className="flex items-center gap-[3px]">
                    <div className="text-red-400/90 text-lg translate-y-1">
                      *
                    </div>{' '}
                    Feature Permission
                  </div>
                  <p className="text-sm text-ny-gray-400">
                    Select all permissions you'd like to assign to this role.
                    Feel free to make multiple selections
                  </p>
                </div>
              }>
              <Cascader
                style={{ width: '100%' }}
                options={options}
                multiple
                maxTagCount="responsive"
              />
            </Form.Item>
          </div>
        </div>
        {footer}
      </Form>
    </div>
  );
};

export default FormEdit;