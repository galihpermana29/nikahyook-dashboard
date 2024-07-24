import notificationIcon from '@/assets/icon/notification.svg';
import { Button, Image, Popover } from 'antd';
import useQueryNotification from '../../../repositories/useGetAllNotifications';
import useMutateUpdateNotifications from '../../../repositories/useUpdateNotifications';
import NotificationContent from './NotificationContent';

function DropdownNotification() {
  const { result, error, isLoading, refetch } = useQueryNotification();

  const { mutate } = useMutateUpdateNotifications(refetch);

  if (isLoading)
    return (
      <Button className="rounded-full relative w-10 h-10 p-0 flex items-center justify-center border-none hover:!bg-ny-gray-100">
        <Image
          src={notificationIcon}
          alt="Notification Icon"
          preview={false}
          className="rounded-full"
        />
      </Button>
    );

  if (!result?.data || error)
    return (
      <div className="text-center text-ny-error-500 bg-ny-error-100 rounded-md px-5 py-2 font-medium">
        Error fetching notifications!
      </div>
    );

  const readNotifications = result.data.filter(
    ({ status }) => status === 'read'
  );

  const unreadNotifications = result.data.filter(
    ({ status }) => status === 'unread'
  );

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
                disabled={result?.data?.length === 0}
                onClick={() => mutate()}
                className="uppercase text-xs text-ny-primary-500 border-none"
                size="small">
                mark all as read
              </Button>
            </div>
          </div>
          <NotificationContent
            readNotifications={readNotifications}
            unreadNotifications={unreadNotifications}
          />
        </>
      }>
      <Button className="rounded-full relative w-10 h-10 p-0 flex items-center justify-center border-none hover:!bg-ny-gray-100">
        {unreadNotifications?.length > 0 && (
          <div className="absolute w-4 h-4 flex justify-center items-center right-0 top-0 bg-red-500 text-white text-[9px] rounded-full">
            {unreadNotifications.length}
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
