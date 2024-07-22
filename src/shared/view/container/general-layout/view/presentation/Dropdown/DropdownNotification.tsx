import notificationIcon from '@/assets/icon/notification.svg';
import { Button, Image, Popover } from 'antd';
import useQueryVendorNotification from '../../../usecase/useGetAllNotifications';
import NotificationContent from './NotificationContent';

function DropdownNotification() {
  const { result, error } = useQueryVendorNotification();

  if (!result?.data || error) return <div></div>;

  return (
    <Popover
      placement="bottomRight"
      trigger={['click']}
      arrow={false}
      content={
        <>
          <div className="min-w-72">
            <div className="flex justify-between items-center py-3 mb-3">
              <h3 className="font-semibold">Notifications</h3>
              <Button
                className="uppercase text-xs text-ny-primary-500 border-none"
                size="small">
                mark all as read
              </Button>
            </div>
          </div>
          <NotificationContent notifications={result?.data} />
        </>
      }>
      <Button className="rounded-full relative w-10 h-10 p-0 flex items-center justify-center border-none hover:!bg-ny-gray-100">
        {result?.data && result?.data?.length > 0 && (
          <div className="absolute w-4 h-4 flex justify-center items-center right-0 top-0 bg-red-500 text-white text-[9px] rounded-full">
            {result?.data?.length}
          </div>
        )}
        <Image
          src={notificationIcon}
          alt="Notification Icon"
          preview={false}
          className="rounded-full"
        />
      </Button>
    </Popover>
  );
}

export default DropdownNotification;
