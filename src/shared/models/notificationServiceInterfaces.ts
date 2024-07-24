export interface Notification {
  id: number;
  title: string;
  description: string;
  user_id: string;
  notification_time: string;
  status: string;
}

export interface AdminNotification {
  id: number;
  title: string;
  description: string;
  type_admin: boolean;
  notification_time: string;
  status: string;
}

export interface IAllVendorNotificationResponseRoot {
  data: Notification[];
}

export interface IAllAdminNotificationResponseRoot {
  data: AdminNotification[];
}

export interface IUpdateNotificationsResponseRoot {
  data: string;
}

export interface ICreateAdminNotificationPayload {
  title: string;
  description: string;
  notification_time?: string;
}

export interface ICreateAdminNotificationResponseRoot {
  data: string;
}

export interface ICreateNotificationPayload {
  title: string;
  description: string;
  user_id: string;
  notification_time?: string;
}

export interface ICreateNotificationResponseRoot {
  data: string;
}
