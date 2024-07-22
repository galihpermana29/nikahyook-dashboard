import { Notification } from '@/shared/models/notificationServiceInterfaces';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

function NotificationContent({
  notifications,
}: {
  notifications: Notification[];
}) {
  return (
    <div className="space-y-3 max-h-44 overflow-y-auto -m-3 mb-1 p-3">
      {notifications.map(({ title, description, notification_time, id }) => (
        <div key={id} className="flex justify-between items-center gap-2">
          <div className="basis-3/4">
            <h4 className="font-medium">{title}</h4>
            <p className="text-sm">{description}</p>
          </div>
          <div className="grow text-end text-ny-gray-400 text-caption-2 whitespace-nowrap">
            {dayjs(notification_time, 'DD-MM-YYYY HH:mm:ss').fromNow()}
          </div>
        </div>
      ))}
    </div>
  );
}

export default NotificationContent;
