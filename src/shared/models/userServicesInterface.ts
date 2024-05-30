import type { Metadata } from './generalInterfaces';

// Login
export interface ILoginPayloadRoot {
  email: string;
  password: string;
}

export interface ILoginData {
  user_id: string;
  email: string;
  token: string;
  permissions: any[];
  type: string;
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
export interface IAllUserResponseRoot {
  data: IDetailUserData[];
  meta_data: Metadata;
}

// Create user

export interface ICreateUserPayloadRoot {
  name: string;
  email: string;
  password: string;
  date_of_birth: string;
  type: string;
  profile_image_uri: string;
  role_id: number;
}

export interface IUserVendorDetail {
  vendor_type_id?: number;
  location?: string;
  json_text?: string;
}

export type IUserVendorDetailPayload = IUserVendorDetailJSON & {
  vendor_type_id?: number;
  location?: string;
};

export interface IUserVendorDetailJSON {
  vendor_description?: string;
  vendor_album?: string | string[];
}

export type ICreateUserVendorInput = ICreateUserPayloadRoot &
  IUserVendorDetailPayload;

export interface ICreateUserVendorPayload extends ICreateUserPayloadRoot {
  detail: IUserVendorDetail;
}

// Response
export interface ICreateUserResponseRoot {
  data: string;
}

// Update User
export interface IUpdateUserPayloadRoot {
  id?: string;
  name?: string;
  email?: string;
  date_of_birth?: string;
  type?: string;
  role_id?: number;
  role_name?: string;
  status?: string;
  profile_image_uri?: string;
}

export type IUpdateUserVendorInput = IUpdateUserPayloadRoot &
  IUserVendorDetailPayload;

export interface IUpdateUserVendorPayload extends IUpdateUserPayloadRoot {
  detail: IUserVendorDetail;
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

export interface IUserClientDetail {
	wedding_date?: string;
	location?: string;
	gender?: string;
}

export interface IUserClientDetailExtra {
	wedding_role?: number;
	groom_name?: string;
	bride_name?: string;
	plan_for?: number;
	wedding_theme?: number;
}

export interface IUserClientDetailPayload extends IUserClientDetail {
	json_text?: string;
}

export type IUpdateUserClientInput = IUpdateUserPayloadRoot &
	IUserClientDetail &
	IUserClientDetailExtra;

export interface IUpdateUserClientPayload extends IUpdateUserPayloadRoot {
	detail?: IUserClientDetailPayload;
}
