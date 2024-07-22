import { IAllVendorNotificationResponseRoot } from '../models/notificationServiceInterfaces';
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
        `notifications${query ? `?${query}` : ''}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    return data;
  }
}

export const DashboardNotificationAPI = new DashboardNotificationServices();
