import HamburgerIcon from '@/assets/icon/hamburger-menu.svg';
import {
  ICreateUserPayloadRoot,
  IDetailAdminUser,
  IDetailVendorUser,
} from '@/shared/models/userServicesInterface';
import { Button, Drawer, Menu, MenuProps } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { useState } from 'react';
import useLogout from '../../../usecase/useLogout';
import DrawerTitle from '../DrawerTitle/DrawerTitle';
import DropdownNotification from '../Dropdown/DropdownNotification';
import DropdownProfile from '../Dropdown/DropdownProfile';

interface ICustomHeader {
  data: ICreateUserPayloadRoot<IDetailAdminUser | IDetailVendorUser>;
  item: MenuProps['items'];
  handleClickMenu: (key: string) => void;
}

export default function CustomHeader({
  data,
  item,
  handleClickMenu,
}: ICustomHeader) {
  const { profile_image_uri } = data;
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);

  const handleLogout = useLogout();

  const handleClick = (key: any) => {
    handleClickMenu(key);
    setIsOpenDrawer(false);
  };

  return (
    <div className="border-b-[1px] border-ny-gray-200">
      <Header className="flex items-center justify-between gap-6 lg:justify-end relative bg-white">
        <Button
          onClick={() => setIsOpenDrawer(!isOpenDrawer)}
          type="text"
          className="flex lg:hidden cursor-pointer">
          <img src={HamburgerIcon} alt="Menu Icon" />
        </Button>

        <DropdownNotification />
        <DropdownProfile
          profile_image_uri={profile_image_uri}
          handleLogout={handleLogout}
        />
      </Header>
      <Drawer
        title={<DrawerTitle handleClose={() => setIsOpenDrawer(false)} />}
        placement="left"
        closable={false}
        onClose={() => setIsOpenDrawer(false)}
        open={isOpenDrawer}
        width="100%">
        <Menu
          className="mt-[16px]"
          theme="light"
          defaultSelectedKeys={['/home']}
          mode="inline"
          items={item}
          onClick={({ key }) => handleClick(key)}
        />
      </Drawer>
    </div>
  );
}
