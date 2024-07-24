import { Button, Dropdown, Image } from 'antd';

interface IDropdownProfile {
  handleLogout: () => void;
  profile_image_uri: string;
}

function DropdownProfile({
  profile_image_uri,
  handleLogout,
}: IDropdownProfile) {
  return (
    <Dropdown
      menu={{
        items: [
          {
            key: 1,
            label: 'Logout',
            onClick: () => handleLogout(),
            className: 'cursor-pointer hover:!text-blue-500 min-w-[150px]',
          },
        ],
      }}
      placement="bottomRight"
      trigger={['click']}>
      <Button className="rounded-full w-10 h-10 bg-ny-gray-100 outline outline-1 p-0 outline-ny-primary-500">
        {profile_image_uri && (
          <Image
            src={profile_image_uri}
            alt="Profile Image"
            width={'100%'}
            height={'100%'}
            preview={false}
            className="rounded-full"
          />
        )}
      </Button>
    </Dropdown>
  );
}

export default DropdownProfile;
