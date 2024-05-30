import {
  IAllVendorTypeResponseRoot,
  ICreateVendorTypePayloadRoot,
  ICreateVendorTypeResponseRoot,
  IDetailVendorTypeResponseRoot,
  IUpdateVendorTypePayloadRoot,
  IUpdateVendorTypeResponseRoot,
} from '../models/vendorTypeInterface';
import { ApiClass } from './generalApi';

class DashboardVendorTypeServices extends ApiClass {
  public async getAllVendorTypes(
    query?: string
  ): Promise<IAllVendorTypeResponseRoot> {
    const token = JSON.parse(localStorage.getItem('token')!);

    const { data } = await this.axiosInstance.get<IAllVendorTypeResponseRoot>(
      `/vendor-types${query ? `?${query}` : ''}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  }

  public async getVendorTypeDetail(
    id: string
  ): Promise<IDetailVendorTypeResponseRoot> {
    const token = JSON.parse(localStorage.getItem('token')!);

    const { data } =
      await this.axiosInstance.get<IDetailVendorTypeResponseRoot>(
        `/vendor-types/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return data;
  }

  public async createVendorType(
    payload: ICreateVendorTypePayloadRoot
  ): Promise<ICreateVendorTypeResponseRoot> {
    const token = JSON.parse(localStorage.getItem('token')!);
    const { data } =
      await this.axiosInstance.post<ICreateVendorTypeResponseRoot>(
        '/vendor-types',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    return data;
  }

  public async editVendorType(
    payload: IUpdateVendorTypePayloadRoot,
    id: string
  ): Promise<IUpdateVendorTypeResponseRoot> {
    const token = JSON.parse(localStorage.getItem('token')!);

    const { data } =
      await this.axiosInstance.patch<IUpdateVendorTypeResponseRoot>(
        `/vendor-types/${id}`,
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

export const DashboardVendorTypeAPI = new DashboardVendorTypeServices();
