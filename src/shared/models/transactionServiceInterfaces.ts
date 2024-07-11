import { Metadata } from './generalInterfaces';

export type TTransasactionStatus =
  | 'waiting for approval'
  | 'waiting for payment'
  | 'payment in review'
  | 'payment done'
  | 'order failed';

export interface VendorOrder {
  id: number;
  buyer: {
    id: string;
    name: string;
  };
  status: TTransasactionStatus;
  order_time: string;
}

export interface IAdminVendorOrder extends VendorOrder {
  vendor: {
    id: string;
    name: string;
  };
  key: number;
}

export interface IAllVendorOrderResponseRoot {
  data: VendorOrder[];
  meta_data: Metadata;
}

export interface IAllAdminVendorOrderResponseRoot {
  data: IAdminVendorOrder[];
  meta_data: Metadata;
}

export interface IVendorOrderDetailBuyer {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  location: string;
}

export interface IOrderDetail {
  id: number;
  vendor_id: string;
  vendor_name: string;
  vendor_email: string;
  product_id: number;
  product_title: string;
  quantity: number;
  quantity_label: string;
  image: string;
  price: number;
  description: string;
}

export interface IVendorOrderDetail {
  id: number;
  buyer: IVendorOrderDetailBuyer;
  status: TTransasactionStatus;
  order_time: string;
  invoice_file_uri: string;
  payments_file_uri: string[];
  order_details: IOrderDetail[];
}

export interface IAdminVendorOrderDetail extends IVendorOrderDetail {
  vendor: {
    id: string;
    name: string;
    email: string;
  };
}

export interface IDetailVendorOrderResponseRoot {
  data: IVendorOrderDetail;
}

export interface IDetailAdminVendorOrderResponseRoot {
  data: IAdminVendorOrderDetail;
}

export interface IUpdateOrderStatusPayload {
  status: TTransasactionStatus;
  payment_file_uri?: string[];
  order_details?: { id: number; price: number; description: string }[];
}

export interface IUpdateOrderStatusResponseRoot {
  data: number;
}
