import type { Metadata } from './generalInterfaces';
import type { IDetailInspirationData } from './inspirationInterfaces';
import type {
  IDetailProductData,
  IDetailVendorTypeData,
} from './productServicesInterface';
import type {
  IDetailUserData,
  IUserVendorDetail,
  IUserVendorDetailJSON,
} from './userServicesInterface';

export interface IRootCuratorialProduct {
  id: IDetailCuratorialData['id'];
}

export interface IDetailCuratorialProduct extends IRootCuratorialProduct {
  title: IDetailProductData['title'];
  price: IDetailProductData['price'];
  images: IDetailProductData['images'];
}

export interface IRootCuratorialVendor {
  id: IDetailUserData['id'];
}

export interface IDetailCuratorialVendor extends IRootCuratorialVendor {
  name: IDetailUserData['name'];
  location: IUserVendorDetail['location'];
  type: IDetailVendorTypeData['name'];
  image: IUserVendorDetailJSON['vendor_album'];
}

export interface IRootCuratorialInspiration {
  id: IDetailInspirationData['id'];
}

export interface IDetailCuratorialInspiration
  extends IRootCuratorialInspiration {
  name: IDetailInspirationData['name'];
  image: IDetailInspirationData['image'];
}

export interface IRootCuratorialData {
  id: number;
  name: string;
  expert_name: string;
  expert_photo: string;
  images: string | string[];
  total_price: number;
  description: string;
}

export interface IDetailCuratorialData extends IRootCuratorialData {
  status: string;
  products: IDetailCuratorialProduct[];
  vendor: IDetailCuratorialVendor[];
  inspirations: IDetailCuratorialInspiration[];
}

export interface ICuratorialResponseRoot {
  data: IDetailCuratorialData;
}

export interface IAllCuratorialResponseRoot {
  data: IDetailCuratorialData[];
  meta_data: Metadata;
}

export interface IUpdateCuratorialPayloadRoot
  extends IRootCuratorialData,
    Pick<IDetailCuratorialData, 'status'> {
  products: IRootCuratorialProduct[];
  inspirations: IRootCuratorialInspiration[];
}

export interface IUpdateCuratorialResponseRoot {
  data: IRootCuratorialData['id'];
  status: string;
}

export interface ICreateCuratorialInputRoot {
  expert_photo: IDetailCuratorialData['expert_photo'];
  name: IDetailCuratorialData['name'];
  expert_name: IDetailCuratorialData['expert_name'];
  description: IDetailCuratorialData['description'];
  images: IDetailCuratorialData['images'];
  inspirations_photos: IDetailCuratorialInspiration['image'][];
  products_photos: IDetailCuratorialProduct['images'];
}

export interface ICreateCuratorialPayloadRoot
  extends Omit<IRootCuratorialData, 'id'> {
  products: IRootCuratorialProduct[];
  inspirations: IRootCuratorialInspiration[];
}

export interface ICreateCuratorialResponseRoot {
  data: IRootCuratorialData['id'];
  status: string;
}
