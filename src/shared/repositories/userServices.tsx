import {
  IAllUserResponseRoot,
  ICreateUserPayloadRoot,
  ICreateUserResponseRoot,
  IDetailAdminUser,
  IDetailClientUser,
  IDetailVendorUser,
  ILoginPayloadRoot,
  ILoginResponseRoot,
  IUpdatePasswordPayloadRoot,
  IUpdatePasswordResponseRoot,
  IUpdateUserResponseRoot,
} from '../models/userServicesInterface';
import { ApiClass } from './generalApi';

class DashboardUserServices extends ApiClass {
  constructor(baseURL?: string, config?: Record<string, any>) {
    super(baseURL, config);
  }
  public async login(payload: ILoginPayloadRoot): Promise<ILoginResponseRoot> {
    const { data } = await this.axiosInstance.post<ILoginResponseRoot>(
      '/auth/login',
      payload
    );
    return data;
  }

  public async getUserById<T>(
    id: string
  ): Promise<{ data: ICreateUserPayloadRoot<T> }> {
    const token = JSON.parse(localStorage.getItem('token')!);
    const { data } = await this.axiosInstance.get<{
      data: ICreateUserPayloadRoot<T>;
    }>(`/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  }

  public async getAllAdminUser(
    query?: string
  ): Promise<IAllUserResponseRoot<IDetailAdminUser>> {
    const token = JSON.parse(localStorage.getItem('token')!);

    const { data } = await this.axiosInstance.get<
      IAllUserResponseRoot<IDetailAdminUser>
    >(`/users?type=admin${query ? `&${query}` : ''}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }

  public async createUser<T>(
    payload: ICreateUserPayloadRoot<T>
  ): Promise<ICreateUserResponseRoot> {
    const token = JSON.parse(localStorage.getItem('token')!);
    const { data } = await this.axiosInstance.post<ICreateUserResponseRoot>(
      '/users',
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  }

  public async editUser<T>(
    payload: ICreateUserPayloadRoot<T>,
    id: string
  ): Promise<IUpdateUserResponseRoot> {
    const token = JSON.parse(localStorage.getItem('token')!);
    const { data } = await this.axiosInstance.patch<IUpdateUserResponseRoot>(
      `/users/${id}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  }

  public async updateUserPassword(
    payload: IUpdatePasswordPayloadRoot
  ): Promise<IUpdatePasswordResponseRoot> {
    const token = JSON.parse(localStorage.getItem('token')!);

    const { data } =
      await this.axiosInstance.patch<IUpdatePasswordResponseRoot>(
        `/users/password`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    return data;
  }

  public async getAllVendorUser(
    query?: string
  ): Promise<IAllUserResponseRoot<IDetailVendorUser>> {
    const token = JSON.parse(localStorage.getItem('token')!);

    const { data } = await this.axiosInstance.get<
      IAllUserResponseRoot<IDetailVendorUser>
    >(`/users?type=vendor${query ? `&${query}` : ''}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }

  public async getAllClientUser(
    query?: string
  ): Promise<IAllUserResponseRoot<IDetailClientUser>> {
    const token = JSON.parse(localStorage.getItem('token')!);

    const { data } = await this.axiosInstance.get<
      IAllUserResponseRoot<IDetailClientUser>
    >(`/users?type=user${query ? `&${query}` : ''}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  }
}

export const DashboardUserAPI = new DashboardUserServices();
