import EventDispatcher from "../../@shared/event/event-dispatcher";
import ClientCreatedEvent from "../event/client_created.event";
import ClientCreatedHandlerEvent from "../event/client_created.handler.event";
import ClientFacade from "../facade/client.facade";
import ClientRepository from "../repository/client.repository";
import FindClientUsecase from "../usecase/find-client/find-client.usecase";
import SaveClientUsecase from "../usecase/save-client/save-client.usecase";

export default class ClientFacadeFactory {
  static create() {
    const repository = new ClientRepository()

    const eventDispatcher = new EventDispatcher()
    const eventHandler = new ClientCreatedEvent()

    eventDispatcher.Register(eventHandler.GetName(), new ClientCreatedHandlerEvent())

    const addUsecase = new SaveClientUsecase(repository, eventDispatcher, eventHandler)
    const findUseCase = new FindClientUsecase(repository)

    const facade = new ClientFacade({
      addUsecase: addUsecase,
      findUsecase: findUseCase
    })

    return facade
  }
}