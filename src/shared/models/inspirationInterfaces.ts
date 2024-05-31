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

export interface ICreateInspirationPayloadRoot {
  name: string;
  image: string;
  tags: Omit<IInspirationTagData, 'name'>;
}

export interface ICreateInspirationResponseRoot {
  data: string;
}

export interface IEditInspirationPayloadRoot {
  name: string;
  image: string;
  tags: Omit<IInspirationTagData, 'name'>;
}

export interface IEditInspirationResponseRoot {
  data: string;
}
