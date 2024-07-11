import type { Metadata } from './generalInterfaces';

// Login
export interface ILoginPayloadRoot {
  email: string;
  password: string;
}

export interface ISessionData extends ILoginData {
  user_detail: IDetailUserData;
}

export interface ILoginData {
  user_id: string;
  email: string;
  token: string;
  permissions: any[];
  type: string;
  status?: string;
}

// Response

export interface ILoginResponseRoot {
  data: ILoginData;
}

// Get user detail

export interface IDetailUserData {
  id: string;
  name: string;
  email: string;
  date_of_birth: string;
  type: string;
  role_id: number;
  role_name: string;
  status: string;
  profile_image_uri: string;
  detail: IUserVendorDetail;
}

// Response

export interface IDetailUserResponseRoot {
  data: IDetailUserData;
}

// Get all user

// Response
export type TGeneralSelectOptions = {
  value: string;
  label: string;
};

export interface IProvinceLocation {
  province: TGeneralSelectOptions;
  city: TGeneralSelectOptions;
  district: TGeneralSelectOptions;
  village: TGeneralSelectOptions;
  postal_code: number;
}
export interface IAllUserResponseRoot<GenericDetail> {
  data: GenericDetail[];
  meta_data: Metadata;
}

// Create user

export interface IDetailAdminUser {
  role_id: number;
  json_text?: string;
}

export interface IDetailVendorUser {
  json_text: string;
  location: IProvinceLocation;
  vendor_type_id: number;
  vendor_type_name?: string;
  avg_rating?: number;
  lowest_price?: number;
}

export interface IDetailClientUser {
  json_text: string;
  location: TGeneralSelectOptions;
  date_of_birth: string;
  gender: string;
  wedding_date: string;
}

export interface ICreateUserPayloadRoot<GenericDetail> {
  name: string;
  email: string;
  password?: string;
  type: string;
  profile_image_uri: string;
  phone_number: string;
  detail: GenericDetail;
}

export interface IUserVendorDetail {
  vendor_type_id?: number;
  location?: string;
  json_text?: string;
}

export interface IUserVendorDetailJSON {
  vendor_description?: string;
  vendor_album?: string | string[];
}

export type ICreateUserVendorInput = ICreateUserPayloadRoot<IDetailVendorUser>;
export type ICreateUserAdminInput = ICreateUserPayloadRoot<IDetailAdminUser>;
export type ICreateUserClientInput = ICreateUserPayloadRoot<IDetailClientUser>;

export interface ICreateUserVendorPayload
  extends ICreateUserPayloadRoot<IDetailVendorUser> {}

export interface ICreateUserAdminPayload
  extends ICreateUserPayloadRoot<IDetailAdminUser> {}

// Response
export interface ICreateUserResponseRoot {
  data: string;
}

// Update User
export interface IUpdateUserVendorPayload extends ICreateUserVendorInput {}
export interface IGetDetailUserVendorResponse extends ICreateUserVendorInput {}
export interface IUpdateUserAdminPayload extends ICreateUserAdminInput {
  status: string;
}

export interface IUpdateUserClientPayload extends ICreateUserClientInput {
  status: string;
}
export interface IUpdateUserResponseRoot {
  data: string;
}

export interface IUpdatePasswordInputRoot {
  old_password: string;
  new_password: string;
}

export interface IUpdatePasswordPayloadRoot extends IUpdatePasswordInputRoot {
  user_id: string;
}

export interface IUpdatePasswordResponseRoot {
  data: string;
}

export interface IUserClientFormValues {
  bride_name: string;
  city: string;
  date_of_birth: string;
  email: string;
  groom_name: string;
  id: string;
  name: string;
  phone_number: string;
  plan_for: number;
  profile_image_uri: string;
  province: string;
  status: string;
  type: string;
  wedding_date: string;
  wedding_role: number;
  gender: string;
  wedding_theme: number;
}

// export interface IUserClientDetail {
//   wedding_date?: string;
//   location?: string;
//   gender?: string;
// }

export interface IUserClientDetailExtra {
  wedding_role?: number;
  groom_name?: string;
  bride_name?: string;
  plan_for?: number;
  wedding_theme?: number;
}

export interface IResetPasswordPayloadRoot {
  user_id: string;
  new_password: string;
}

export interface IResetPasswordResponseRoot {
  data: string;
  status: string
}

// export interface IUserClientDetailPayload extends IUserClientDetail {
//   json_text?: string;
// }
