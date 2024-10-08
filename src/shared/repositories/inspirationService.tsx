import type {
  IAllInspirationResponseRoot,
  ICreateInspirationPayloadRoot,
  ICreateInspirationResponseRoot,
  IEditInspirationPayloadRoot,
  IEditInspirationResponseRoot,
  IGetInspirationByIdResponseRoot,
} from '../models/inspirationInterfaces';
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

  public async getInspirationById(
    id: string
  ): Promise<IGetInspirationByIdResponseRoot> {
    const token = JSON.parse(localStorage.getItem('token')!);

    const { data } =
      await this.axiosInstance.get<IGetInspirationByIdResponseRoot>(
        `/inspirations/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

    return data;
  }

  public async createInspiration(
    payload: ICreateInspirationPayloadRoot
  ): Promise<ICreateInspirationResponseRoot> {
    const token = JSON.parse(localStorage.getItem('token')!);
    const { data } =
      await this.axiosInstance.post<ICreateInspirationResponseRoot>(
        '/inspirations',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    return data;
  }

  public async editInspiration(
    payload: IEditInspirationPayloadRoot,
    id: number
  ): Promise<IEditInspirationResponseRoot> {
    const token = JSON.parse(localStorage.getItem('token')!);

    const { data } =
      await this.axiosInstance.patch<IEditInspirationResponseRoot>(
        `/inspirations/${id}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    return data;
  }
}

export const InspirationAPI = new InspirationServices();
