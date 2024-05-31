import type { Metadata } from './generalInterfaces';

export interface IInspirationTagData {
  id: number;
  name: string;
}

export interface IDetailInspirationData {
  id: number;
  name: string;
  image?: string;
  tags: IInspirationTagData[];
  status: string;
}

export interface IAllInspirationResponseRoot {
  data: IDetailInspirationData[];
  meta_data: Metadata;
}
