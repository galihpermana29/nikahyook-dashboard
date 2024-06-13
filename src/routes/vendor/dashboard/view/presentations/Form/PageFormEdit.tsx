import PageHeader from '@/shared/view/presentations/page-header/PageHeader';
import { Button, Form } from 'antd';
import { FormInstance } from 'antd/es/form/Form';
import { useNavigate } from 'react-router-dom';
import VendorInformation from '../VendorInformation';
import VendorProfilePicture from '../VendorProfilePicture';
import VendorBasicDetails from '../VendorBasicDetails';
import VendorAdditionalDetails from '../VendorAdditionalDetails';
import VendorAlbum from '../VendorAlbum';
import { TGeneralSelectOptions } from '@/shared/models/generalInterfaces';
import { IVendorLocation } from '@/routes/admin/vendor-management/vendor-user-management/view/container/Create/VendorUserCreate';

interface IFormCreate {
  form: FormInstance;
  onSave: any;
  onCancel: () => void;
  id: string;
  disabled: boolean;
  onChangePasswordClick?: () => void;
  showEditButton?: boolean;
  dynamicSelectOptions: {
    provinceTypes: TGeneralSelectOptions[];
    cityTypes: TGeneralSelectOptions[];
    districtTypes: TGeneralSelectOptions[];
    villageTypes: TGeneralSelectOptions[];
  };
  onLocationChange: React.Dispatch<React.SetStateAction<IVendorLocation>>;
}

export const PageFormEdit = ({
  form,
  onSave,
  onCancel,
  disabled = false,
  showEditButton = false,
  id,
  onChangePasswordClick,
  dynamicSelectOptions,
  onLocationChange,
}: IFormCreate) => {
  const navigate = useNavigate();

  return (
    <Form
      form={form}
      onFinish={(val) => onSave({ payload: val, type: 'edit', id })}
      layout="vertical"
      disabled={disabled}
      className="flex flex-col gap-5 relative">
      <VendorInformation />

      <PageHeader
        title="Profile Details"
        onCancel={onCancel}
        id={id}
        buttonsBefore={
          <Button
            onClick={onChangePasswordClick}
            type="text"
            className="text-ny-primary-500">
            Change Password
          </Button>
        }
        buttonsAfter={
          showEditButton && (
            <Button
              disabled={false}
              onClick={() => navigate(`/vendor-account/edit-user/${id}`)}
              className="enabled:hover:!bg-ny-primary-500 enabled:hover:!text-white h-[40px] bg-ny-primary-500 text-white text-body-2  font-[400] rounded-[8px] flex items-center gap-[8px] cursor-pointer">
              Edit
            </Button>
          )
        }
      />

      <VendorProfilePicture />

      <VendorBasicDetails />

      <VendorAdditionalDetails
        dynamicSelectOptions={dynamicSelectOptions}
        onLocationChange={onLocationChange}
      />

      <VendorAlbum />
    </Form>
  );
};
