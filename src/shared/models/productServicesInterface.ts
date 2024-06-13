import { IVendorLocation } from '@/routes/admin/vendor-management/vendor-user-management/view/container/Create/VendorUserCreate';
import { Metadata, TGeneralSelectOptions } from './generalInterfaces';
import { ICreateUserVendorPayload } from './userServicesInterface';

export interface IProductLocation {
  province: TGeneralSelectOptions;
  city: TGeneralSelectOptions;
  district: TGeneralSelectOptions;
  village: TGeneralSelectOptions;
  postal_code: number;
}

export interface IDetailProductData {
  id: number;
  title: string;
  tags: any[];
  vendor_id: string;
  vendor_name: string;
  price: string;
  description: string;
  images: string[];
  status: string;
}

export interface IAllProductResponseRoot {
  data: IDetailProductData[];
  meta_data: Metadata;
}

export interface ICreateProductPayloadRoot {
  title?: string;
  tags?: any[];
  vendor_id?: string;
  price?: number;
  description?: string;
  images?: string[];
  status: string;
  product_type_id: number;
  quantity_label: string;
  location: IVendorLocation;
  coverage_area: ICoverageArea[];
  name: string;
}

export interface IDetailProductResponseRoot {
  id: number;
  product_type_id: number;
  product_type_name: string;
  title: string;
  tags: any[];
  vendor_id: string;
  price: number;
  description: string;
  images: string[];
  status: string;
  rating: number;
  quantity_label: string;
  vendor: ICreateUserVendorPayload;
  location: IVendorLocation;
  coverage_area: ICoverageArea[];
  is_wishlist: boolean;
}

export interface ICreateProductFormValues {
  city: string;
  coverage_city: string[];
  coverage_province: string[];
  description: string;
  district: string;
  images: string[];
  postal_code: number;
  price: number;
  product_type_id: number;
  province: string;
  quantity_label: string;
  tags: number[];
  title: string;
  vendor_id: string;
  village: string;
  name: string;
}

export interface ICoverageArea {
  province: TGeneralSelectOptions;
  city: TGeneralSelectOptions;
}

export interface ICreateProductResponseRoot {
  data: string;
}

export interface IUpdateProductPayloadRoot {
  title?: string;
  tags?: any[];
  vendor_id?: string;
  price?: number;
  description?: string;
  images?: string[];
  status: string;
}

export interface IUpdateProductResponseRoot {
  data: string;
}

export interface IDetailProductResponseRoot {
  data: IDetailProductData;
}

export interface IDetailTagsData {
  id: number;
  name: string;
  status: string;
}

export interface IDetailProductTag {
  id: number;
  name: string;
  status: string;
}

export interface IAllProductTagResponseRoot {
  data: IDetailTagsData[];
  meta_data: Metadata;
}

export interface ICreateProductTagPayloadRoot {
  name: string;
}

export interface ICreateProductTagResponseRoot {
  data: string;
}

export interface IUpdateProductTagPayloadRoot {
  name?: string;
  status?: string;
}

export interface IUpdateProductTagResponseRoot {
  data: string;
}

export interface IDetailProductTagResponseRoot {
  data: IDetailProductData;
}

export interface IDetailProductTypeData {
  id: number;
  name: string;
  status: string;
}

export interface IAllProductTypeResponseRoot {
  data: IDetailProductTypeData[];
  meta_data: Metadata;
}

export interface ICreateProductTypePayloadRoot {
  name: string;
}

export interface ICreateProductTypeResponseRoot {
  data: string;
}

export interface IUpdateProductTypePayloadRoot {
  name?: string;
  status?: string;
}

export interface IUpdateProductTypeResponseRoot {
  data: string;
}

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
