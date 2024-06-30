import { Button, Drawer, Menu, MenuProps } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Header } from 'antd/es/layout/layout';
import { useState } from 'react';
import useLogout from '../../../usecase/useLogout';
import {
  ICreateUserPayloadRoot,
  IDetailAdminUser,
  IDetailVendorUser,
} from '@/shared/models/userServicesInterface';
import HamburgerIcon from '@/assets/icon/hamburger-menu.svg';
import DrawerTitle from '../DrawerTitle/DrawerTitle';

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
  const { name } = data;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);

  const handleLogout = useLogout();

  const handleClick = (key: any) => {
    handleClickMenu(key);
    setIsOpenDrawer(false);
  };

  return (
    <div className="border-b-[1px] border-ny-gray-200">
      <Header className="flex items-center justify-between lg:justify-end relative bg-white">
        <Button
          onClick={() => setIsOpenDrawer(!isOpenDrawer)}
          type="text"
          className="flex lg:hidden cursor-pointer"
        >
          <img src={HamburgerIcon} alt="Menu Icon" />
        </Button>
        <div
          className="flex gap-[10px] items-center cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <h1 className="capitalize">{name}</h1>

          {isOpen ? (
            <UpOutlined className="text-[12px]" />
          ) : (
            <DownOutlined className="text-[12px]" />
          )}
        </div>
        {isOpen && (
          <div className="absolute top-[60px] z-[20] right-[2%] bg-white shadow-lg rounded-lg min-w-[150px] flex flex-col px-[10px]">
            <p
              className=" h-[50px] flex items-center cursor-pointer hover:text-blue-500"
              onClick={handleLogout}
            >
              Logout
            </p>
          </div>
        )}
      </Header>
      <Drawer
        title={<DrawerTitle handleClose={() => setIsOpenDrawer(false)} />}
        placement="left"
        closable={false}
        onClose={() => setIsOpenDrawer(false)}
        open={isOpenDrawer}
        width="100%"
      >
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
