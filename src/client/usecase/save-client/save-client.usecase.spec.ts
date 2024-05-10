import EventDispatcher from "../../../@shared/event/event-dispatcher"
import KafkaProducer from "../../../@shared/kafka/kafka.producer"
import ClientCreatedEvent from "../../event/client_created.event"
import ClientCreatedHandlerEvent from "../../event/client_created.handler.event"
import { clientMockInput, MockClientRepository } from "../../mock/client.mock"
import SaveClientUsecase from "./save-client.usecase"

jest.mock('../../../@shared/kafka/kafka.producer', () => {
  return jest.fn();
});

const mockKafkaProducer = require('../../../@shared/kafka/kafka.producer');
describe("SaveClientUsecase test", () => {
  it("should save a client", async () => {
    const repository = MockClientRepository()

    const eventDispatcher = new EventDispatcher()
    const eventHandler = new ClientCreatedEvent()

    eventDispatcher.Register(eventHandler.GetName(), new ClientCreatedHandlerEvent())

    const usecase = new SaveClientUsecase(repository, eventDispatcher, eventHandler)

    // Mock the KafkaProducer function
    mockKafkaProducer.mockImplementation(() => Promise.resolve());

    const result = await usecase.execute(clientMockInput)

    expect(repository.Save).toHaveBeenCalled()
    expect(result.id).toEqual(clientMockInput.id)
    expect(result.name).toEqual(clientMockInput.name)
    expect(result.email).toEqual(clientMockInput.email)

    // Verify that KafkaProducer was called
    expect(KafkaProducer).toHaveBeenCalled();
  })
})


