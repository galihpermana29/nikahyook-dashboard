import {
  AdminNotification,
  Notification,
} from '@/shared/models/notificationServiceInterfaces';
import convertToRelativeTime from '../../../usecase/convertToRelativeTime';
import { Divider, Image } from 'antd';
import emptyImage from '@/assets/empty.png';

function NotificationContent({
  readNotifications,
  unreadNotifications,
}: {
  readNotifications: Notification[] | AdminNotification[];
  unreadNotifications: Notification[] | AdminNotification[];
}) {
  if (readNotifications?.length === 0 && unreadNotifications?.length === 0)
    return (
      <div className="flex flex-col gap-3 mt-5 items-center justify-center">
        <Image
          src={emptyImage}
          alt="Empty Box"
          preview={false}
          className="!w-16"
        />
        <p className="text-xs font-medium text-ny-gray-300">
          There is no notification yet
        </p>
      </div>
    );

  return (
    <div className="overflow-y-auto -m-3 mb-1 p-3 max-h-44 max-w-[400px] space-y-16">
      {unreadNotifications?.length > 0 && (
        <div className="space-y-3">
          <Divider
            orientation="center"
            className="font-semibold !m-0 !text-sm pb-3">
            New Notifications
          </Divider>
          {unreadNotifications.map(
            ({ title, description, notification_time, id }) => (
              <div key={id} className="space-y-2">
                <div className="flex justify-between gap-2 items-center">
                  <h4 className="font-medium text-base text-ny-primary-500">
                    {title}
                  </h4>
                  <p className="text-end text-ny-gray-400 text-caption-2">
                    {convertToRelativeTime(notification_time)}
                  </p>
                </div>
                <p className="text-sm">{description}</p>
              </div>
            )
          )}
        </div>
      )}
      {readNotifications?.length > 0 && (
        <div className="space-y-3">
          {readNotifications.map(
            ({ title, description, notification_time, id }) => (
              <div key={id} className="flex justify-between gap-2">
                <div className="basis-3/4 space-y-1">
                  <h4 className="font-medium text-base">{title}</h4>
                  <p className="text-sm text-ny-gray-400">{description}</p>
                </div>
                <div className="grow text-end text-ny-gray-400 text-caption-2 whitespace-nowrap">
                  {convertToRelativeTime(notification_time)}
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default NotificationContent;
