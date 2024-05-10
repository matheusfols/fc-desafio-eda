import ClientEntity from '../domain/entity/client.entity';
import ClientRepository from './client.repository';
import MockDB from '../../@shared/mock/db.mock';
import { ClientModel } from './client.model';

describe("ClientRepository test", () => {
  let mockDB: any;
  let transaction: any;

  beforeEach(async () => {
    mockDB = await MockDB([ClientModel]);
    transaction = mockDB.transaction;
  });

  afterEach(async () => {
    await transaction.rollback();
    await mockDB.close();
  });

  it("should save a client", async () => {
    const client = new ClientEntity({
      name: "John Doe",
      email: "johndoe@teste.com"
    });

    expect(client).toBeDefined();

    const clientRepository = new ClientRepository()

    await clientRepository.Save(client, transaction);

    const findClient = await ClientModel.findOne({
      where: {
        id: client.id.id
      },
      raw: true,
      transaction
    });

    expect(findClient).toBeDefined();
    expect(findClient.id).toEqual(client.id.id);
    expect(findClient.name).toEqual(client.name);
    expect(findClient.email).toEqual(client.email);
  });

  it("should find by id a client", async () => {
    const client = new ClientEntity({
      name: "Maria Doe",
      email: "maria@doe.com"
    });

    expect(client).toBeDefined();

    const clientRepository = new ClientRepository();

    await clientRepository.Save(client, transaction);

    const findClient = await clientRepository.FindById(client.id.id, transaction);

    expect(findClient).toBeDefined();
    expect(findClient.name).toEqual(client.name);
    expect(findClient.email).toEqual(client.email);
  })
})

