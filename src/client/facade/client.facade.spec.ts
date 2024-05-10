import EventDispatcher from "../../@shared/event/event-dispatcher";
import MockDB from "../../@shared/mock/db.mock";
import ClientCreatedEvent from "../event/client_created.event";
import ClientCreatedHandlerEvent from "../event/client_created.handler.event";
import { clientMockInput, MockClientRepository } from "../mock/client.mock";
import { ClientModel } from "../repository/client.model";
import FindClientUsecase from "../usecase/find-client/find-client.usecase";
import SaveClientUsecase from "../usecase/save-client/save-client.usecase";
import ClientFacade from "./client.facade";

jest.mock('../../@shared/kafka/kafka.producer', () => {
  return jest.fn();
});

const mockKafkaProducer = require('../../@shared/kafka/kafka.producer');

describe("Client Facade Test", () => {
  let transaction: any;

  beforeAll(async () => {
    transaction = await MockDB([ClientModel]);
  });

  afterEach(async () => {
    await transaction.rollback();
  });

  it("should add and find a client", async () => {
    const repository = MockClientRepository()

    const eventDispatcher = new EventDispatcher()
    const eventHandler = new ClientCreatedEvent()

    eventDispatcher.Register(eventHandler.GetName(), new ClientCreatedHandlerEvent())

    const addUsecase = new SaveClientUsecase(repository, eventDispatcher, eventHandler)
    const findUseCase = new FindClientUsecase(repository)

    // Mock the KafkaProducer function
    mockKafkaProducer.mockImplementation(() => Promise.resolve());

    const facade = new ClientFacade({
      addUsecase: addUsecase,
      findUsecase: findUseCase
    })

    await facade.add(clientMockInput)

    const find = {
      id: clientMockInput.id
    }

    const client = await facade.find(find);

    expect(client).toBeDefined()
    expect(client.id).toBeDefined()
    expect(client.name).toBe(clientMockInput.name)
    expect(client.email).toBe(clientMockInput.email)

  })
})