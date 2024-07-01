import type {
  ICreateUserPayloadRoot,
  IDetailAdminUser,
  IDetailVendorUser,
} from '@/shared/models/userServicesInterface';
import { Avatar } from 'antd';

export default function UserInformation({
  user,
}: {
  user:
    | ICreateUserPayloadRoot<IDetailAdminUser | IDetailVendorUser>
    | undefined;
}) {
  if (!user) return null;

  return (
    <div className="flex items-center gap-4 sticky top-0 bg-white py-4 z-10">
      <Avatar className="size-14" src={user.profile_image_uri} />

      <div className="flex flex-col gap-[2px]">
        <h1 className="text-body-1 font-medium">{user.name}</h1>
        <h3 className="text-body-2 text-ny-gray-400">{user.email}</h3>
      </div>
    </div>
  );
}
