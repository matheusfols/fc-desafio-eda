export interface AddClientFacadeInputDto {
  id: string;
  name: string;
  email: string;
}

export interface FindClientFacadeInputDto {
  id: string;
}

export interface FindClientFacadeOutputDto {
  id: string;
  name: string;
  email: string;
  createdAt: Date
  updatedAt: Date
}

export default interface ClientFacadeInterface {
  add(input: AddClientFacadeInputDto): Promise<void>;
  find(input: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDto>;
}