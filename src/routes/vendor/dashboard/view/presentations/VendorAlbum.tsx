import DraggerUpload from '@/shared/view/presentations/dragger-upload/DraggerUpload';
import { Form } from 'antd';
import { FormRow } from '@/shared/view/presentations/form-row/FormRow';

export default function VendorAlbum() {
  const form = Form.useFormInstance();

  return (
    <FormRow
      title="Album"
      description="Set your additional photo to your album">
      <Form.Item noStyle name={'vendor_album'}>
        <DraggerUpload
          multiple={true}
          form={form}
          formItemName="vendor_album"
          limit={10}
          profileImageURL={form.getFieldValue('vendor_album')}
        />
      </Form.Item>
    </FormRow>
  );
}
