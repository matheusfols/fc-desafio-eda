import { EventDispatcherInterface, EventInterface } from "../../../@shared/event/event.interface";
import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import Id from "../../../@shared/value-object/id.value-object";
import ClientEntity from "../../domain/entity/client.entity";
import { ClientEntityProps } from "../../domain/entity/client.interfaces";
import ClientGateway from "../../gateway/client.gateway";
import { SaveClientInputDto, SaveClientOutputDto } from "./save-client.usecase.dto";


export default class SaveClientUsecase implements UseCaseInterface {

  private _clientRepository: ClientGateway
  private _eventDispatcher: EventDispatcherInterface
  private _event: EventInterface

  constructor(clientRepository: ClientGateway, eventDispatcher: EventDispatcherInterface, event: EventInterface) {
    this._clientRepository = clientRepository
    this._eventDispatcher = eventDispatcher
    this._event = event
  }

  async execute(input: SaveClientInputDto): Promise<SaveClientOutputDto> {
    try {
      const values: ClientEntityProps = {
        id: new Id(input.id),
        name: input.name,
        email: input.email
      }

      const client = new ClientEntity(values)

      await this._clientRepository.Save(client)

      const returnClient: SaveClientOutputDto = {
        id: client.id.id,
        name: client.name,
        email: client.email,
        createdAt: client.createdAt,
        updatedAt: client.updatedAt
      }

      this._event.SetPayload(returnClient)
      this._eventDispatcher.Dispatch(this._event)



      return returnClient
    } catch (error) {
      throw error
    }
  }


}
