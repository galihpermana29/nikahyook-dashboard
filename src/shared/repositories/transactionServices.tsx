import {
  IAllAdminVendorOrderResponseRoot,
  IAllVendorOrderResponseRoot,
  IDetailAdminVendorOrderResponseRoot,
  IDetailVendorOrderResponseRoot,
  IUpdateOrderStatusPayload,
  IUpdateOrderStatusResponseRoot,
} from '../models/transactionServiceInterfaces';
import { ApiClass } from './generalApi';

class DashboardTransactionServices extends ApiClass {
  constructor(baseURL?: string, config?: Record<string, any>) {
    super(baseURL, config);
  }

  public async getAllTransactions(
    query?: string
  ): Promise<IAllAdminVendorOrderResponseRoot> {
    const token = JSON.parse(localStorage.getItem('token')!);

    const { data } =
      await this.axiosInstance.get<IAllAdminVendorOrderResponseRoot>(
        `orders/cms?${query ? `?${query}` : ''}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    return data;
  }

  public async getTransactionsByVendorId(
    query?: string
  ): Promise<IAllVendorOrderResponseRoot> {
    const token = JSON.parse(localStorage.getItem('token')!);

    const { data } = await this.axiosInstance.get<IAllVendorOrderResponseRoot>(
      `orders/vendors?${query ? `?${query}` : ''}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  }

  public async getAdminTransactionDetail(
    id: string
  ): Promise<{ data: IDetailAdminVendorOrderResponseRoot }> {
    const token = JSON.parse(localStorage.getItem('token')!);

    const { data } = await this.axiosInstance.get<{
      data: IDetailAdminVendorOrderResponseRoot;
    }>(`/orders/cms/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  }

  public async getVendorTransactionDetail(
    id: string
  ): Promise<{ data: IDetailVendorOrderResponseRoot }> {
    const token = JSON.parse(localStorage.getItem('token')!);

    const { data } = await this.axiosInstance.get<{
      data: IDetailVendorOrderResponseRoot;
    }>(`/orders/vendors/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  }

  public async updateTransactionStatus(
    payload: IUpdateOrderStatusPayload,
    id: number
  ): Promise<IUpdateOrderStatusResponseRoot> {
    const token = JSON.parse(localStorage.getItem('token')!);

    const { data } =
      await this.axiosInstance.patch<IUpdateOrderStatusResponseRoot>(
        `/orders/${id}`,
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

export const DashboardTransactionAPI = new DashboardTransactionServices();
