export interface Notification {
  id: number;
  title: string;
  description: string;
  user_id: string;
  notification_time: string;
  status: string;
}

export interface IAllVendorNotificationResponseRoot {
  data: Notification[];
}
