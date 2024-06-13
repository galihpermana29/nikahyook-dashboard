import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Header } from 'antd/es/layout/layout';
import { useState } from 'react';
import useLogout from '../../../usecase/useLogout';
import {
  ICreateUserPayloadRoot,
  IDetailAdminUser,
  IDetailVendorUser,
} from '@/shared/models/userServicesInterface';

interface ICustomHeader {
  data: ICreateUserPayloadRoot<IDetailAdminUser | IDetailVendorUser>;
}
export default function CustomHeader({ data }: ICustomHeader) {
  const { name } = data;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleLogout = useLogout();

  return (
    <div className="border-b-[1px] border-ny-gray-200">
      <Header className="flex justify-end relative bg-white">
        <div
          className="flex gap-[10px] items-center cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}>
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
              onClick={handleLogout}>
              Logout
            </p>
          </div>
        )}
      </Header>
    </div>
  );
}
