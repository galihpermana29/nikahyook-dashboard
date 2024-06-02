import type { Metadata, TGeneralSelectOptions } from './generalInterfaces';

export interface IInspirationTagData {
  id: number;
  label: string;
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

export interface IGetInspirationByIdResponseRoot {
  data: IDetailInspirationData;
  meta_data: Metadata;
}

export interface ICreateInspirationInputRoot {
  name: string;
  image: string;
  tags: TGeneralSelectOptions[];
}

export interface ICreateInspirationPayloadRoot {
  name: string;
  image: string;
  tags: Pick<IInspirationTagData, 'id'>[];
}

export interface ICreateInspirationResponseRoot {
  data: string;
}

export interface IEditInspirationPayloadRoot {
  name: string;
  image: string;
  tags: Pick<IInspirationTagData, 'id'>[];
}

export interface IEditInspirationInputRoot {
  id: number;
  name: string;
  image: string;
  tags: TGeneralSelectOptions[];
}

export interface IEditInspirationResponseRoot {
  data: string;
}
