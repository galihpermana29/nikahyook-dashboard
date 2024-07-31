import type {
  IAllCuratorialResponseRoot,
  ICreateCuratorialPayloadRoot,
  ICreateCuratorialResponseRoot,
  ICuratorialInputRoot,
  ICuratorialResponseRoot,
  IUpdateCuratorialResponseRoot,
} from '../models/curatorialInterfaces';
import { ApiClass } from './generalApi';

class CuratorialServices extends ApiClass {
  constructor(baseURL?: string, config?: Record<string, any>) {
    super(baseURL, config);
  }

  public async getAllCuratorials(
    query?: string
  ): Promise<IAllCuratorialResponseRoot> {
    const token = JSON.parse(localStorage.getItem('token')!);

    const { data } = await this.axiosInstance.get<IAllCuratorialResponseRoot>(
      `/curatorials${query ? `?${query}` : ''}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  }

  public async getCuratorialById(id: string): Promise<ICuratorialResponseRoot> {
    const token = JSON.parse(localStorage.getItem('token')!);
    const { data } = await this.axiosInstance.get<ICuratorialResponseRoot>(
      `/curatorials/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  }

  public async createCuratorial(
    payload: ICreateCuratorialPayloadRoot
  ): Promise<ICreateCuratorialResponseRoot> {
    const token = JSON.parse(localStorage.getItem('token')!);
    const { data } =
      await this.axiosInstance.post<ICreateCuratorialResponseRoot>(
        '/curatorials',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    return data;
  }

  public async editCuratorial(
    payload: ICuratorialInputRoot,
    id: number
  ): Promise<IUpdateCuratorialResponseRoot> {
    const token = JSON.parse(localStorage.getItem('token')!);

    const { data } =
      await this.axiosInstance.patch<IUpdateCuratorialResponseRoot>(
        `/curatorials/${id}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    return data;
  }
}

export const CuratorialsAPI = new CuratorialServices();
