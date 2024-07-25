export interface Metadata {
  total_items: number;
  total_pages: number;
  current_page: number;
  limit: number;
  next_page: number;
  previous_page: number;
}

export type TGeneralFilter = {
  limit?: number;
  page?: number;
  keyword?: string;
  status?: string;
  tags?: string[];
  max_price?: string;
  min_price?: string;
  vendor_id?: string;
  product_id?: number;
  start_date_trx?: string;
  end_date_trx?: string;
};

export type TGeneralSelectOptions = {
  value: any;
  label: any;
};

export type TEmsifaAPIResponse = {
  id: string;
  name: string;
};

export type TPostalCodeResponse = {
  code: number;
  village: string;
  district: string;
  regency: string;
  province: string;
  latitude: number;
  longitude: number;
  elevation: number;
  timezone: string;
};
