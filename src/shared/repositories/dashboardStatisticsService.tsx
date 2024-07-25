import { IDashboardStatisticsResponseRoot } from '../models/dashboardStatisticsInterfaces';
import { ApiClass } from './generalApi';

class DashboardStatistics extends ApiClass {
  constructor(baseURL?: string, config?: Record<string, any>) {
    super(baseURL, config);
  }

  public async getAllDashboardStatistics(
    query?: string
  ): Promise<IDashboardStatisticsResponseRoot> {
    const token = JSON.parse(localStorage.getItem('token')!);

    const { data } =
      await this.axiosInstance.get<IDashboardStatisticsResponseRoot>(
        `/statistics/dashboard-admin${query ? `?${query}` : ''}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

    return data;
  }
}

export const DashboardStatisticsAPI = new DashboardStatistics();
