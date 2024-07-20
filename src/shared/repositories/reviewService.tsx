import { IAllReviewResponseRoot } from '../models/reviewServiceInterfaces';
import { ApiClass } from './generalApi';

class DashboardReviewService extends ApiClass {
  constructor(baseURL?: string, config?: Record<string, any>) {
    super(baseURL, config);
  }

  public async getAllReviews(query?: string): Promise<IAllReviewResponseRoot> {
    const token = JSON.parse(localStorage.getItem('token')!);
    const id = JSON.parse(localStorage.getItem('admin')!);

    const { data } = await this.axiosInstance.get<IAllReviewResponseRoot>(
      `/reviews${query ? `?vendor_id${id.user_id}&${query}` : ''}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return data;
  }
}

export const DashboardReviewAPI = new DashboardReviewService();
