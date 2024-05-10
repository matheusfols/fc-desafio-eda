import Id from "../../../@shared/value-object/id.value-object";

export interface SaveClientInputDto {
  id?: string
  name: string;
  email: string;
}

export interface SaveClientOutputDto {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}
