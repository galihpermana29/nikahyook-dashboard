import { Metadata } from './generalInterfaces';

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
