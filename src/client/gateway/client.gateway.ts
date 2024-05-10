import ClientEntity from "../domain/entity/client.entity"

export default interface ClientGateway {
  FindById(id: string, transaction?: null): Promise<ClientEntity>
  Save(client: ClientEntity, transaction?: null): Promise<void>
}