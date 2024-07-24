/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IAllVendorNotificationResponseRoot,
  ICreateAdminNotificationPayload,
  ICreateAdminNotificationResponseRoot,
  ICreateNotificationPayload,
  ICreateNotificationResponseRoot,
  IUpdateNotificationsResponseRoot,
} from '../models/notificationServiceInterfaces';
import { ApiClass } from './generalApi';

class DashboardNotificationServices extends ApiClass {
  constructor(baseURL?: string, config?: Record<string, any>) {
    super(baseURL, config);
  }

  public async getAllVendorNotifications(
    query?: string
  ): Promise<IAllVendorNotificationResponseRoot> {
    const token = JSON.parse(localStorage.getItem('token')!);

    const { data } =
      await this.axiosInstance.get<IAllVendorNotificationResponseRoot>(
        `/notifications${query ? `?${query}` : ''}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    return data;
  }

  public async getAllAdminNotifications(
    query?: string
  ): Promise<IAllVendorNotificationResponseRoot> {
    const token = JSON.parse(localStorage.getItem('token')!);

    const { data } =
      await this.axiosInstance.get<IAllVendorNotificationResponseRoot>(
        `/admin-notifications${query ? `?${query}` : ''}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    return data;
  }

  public async readAllNotifications(): Promise<IUpdateNotificationsResponseRoot> {
    const token = JSON.parse(localStorage.getItem('token')!);

    const { data } =
      await this.axiosInstance.patch<IUpdateNotificationsResponseRoot>(
        `/notifications/mark-all-as-read`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return data;
  }

  public async createAdminNotification(
    payload: ICreateAdminNotificationPayload
  ): Promise<ICreateAdminNotificationResponseRoot> {
    const token = JSON.parse(localStorage.getItem('token')!);

    const { data } =
      await this.axiosInstance.post<ICreateAdminNotificationResponseRoot>(
        '/admin-notifications',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    return data;
  }

  public async createNotification(
    payload: ICreateNotificationPayload
  ): Promise<ICreateNotificationResponseRoot> {
    const token = JSON.parse(localStorage.getItem('token')!);

    const { data } =
      await this.axiosInstance.post<ICreateNotificationResponseRoot>(
        '/notifications',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    return data;
  }
}

export const DashboardNotificationAPI = new DashboardNotificationServices();
