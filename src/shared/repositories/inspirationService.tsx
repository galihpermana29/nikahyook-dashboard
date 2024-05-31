import type { IAllInspirationResponseRoot } from '../models/inspirationInterfaces';
import { ApiClass } from './generalApi';

class InspirationServices extends ApiClass {
  constructor(baseURL?: string, config?: Record<string, any>) {
    super(baseURL, config);
  }

  public async getAllInspirations(
    query?: string
  ): Promise<IAllInspirationResponseRoot> {
    const token = JSON.parse(localStorage.getItem('token')!);

    const { data } = await this.axiosInstance.get<IAllInspirationResponseRoot>(
      `/inspirations${query ? `?${query}` : ''}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  }
}

export const InspirationAPI = new InspirationServices();
