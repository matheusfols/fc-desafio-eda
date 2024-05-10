import { Transaction } from "sequelize";
import ClientEntity from "../domain/entity/client.entity";
import ClientGateway from "../gateway/client.gateway";
import Id from "../../@shared/value-object/id.value-object";
import { ClientModel } from "./client.model";

export default class ClientRepository implements ClientGateway {
  async FindById(id: string, transaction: Transaction = null): Promise<ClientEntity> {
    try {
      const findClient = await ClientModel.findOne({ where: { id }, raw: true, transaction });

      if (!findClient) {
        throw new Error("Client not found");
      }

      const client = new ClientEntity({
        id: new Id(findClient.id),
        name: findClient.name,
        email: findClient.email,
        createdAt: findClient.createdAt,
        updatedAt: findClient.updatedAt
      });

      return client

    } catch (error) {
      throw new Error("Error finding client");
    }
  }

  async Save(entity: ClientEntity, transaction: Transaction = null): Promise<void> {
    try {
      const input = {
        id: entity.id.id,
        name: entity.name,
        email: entity.email,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt
      }

      await ClientModel.create(input, { transaction });

    } catch (error) {
      throw new Error("Error saving client");
    }
  }

}