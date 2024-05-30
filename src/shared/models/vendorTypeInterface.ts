import { Metadata } from './generalInterfaces';

export interface IDetailVendorTypeData {
  id: number;
  name: string;
  status: string;
}

export interface IDetailVendorTypeResponseRoot {
  data: IDetailVendorTypeData;
}

export interface IAllVendorTypeResponseRoot {
  data: IDetailVendorTypeData[];
  meta_data: Metadata;
}

export interface ICreateVendorTypePayloadRoot {
  name: string;
}

export interface ICreateVendorTypeResponseRoot {
  data: string;
}

export interface IUpdateVendorTypePayloadRoot {
  name?: string;
  status?: string;
}

export interface IUpdateVendorTypeResponseRoot {
  data: string;
}
