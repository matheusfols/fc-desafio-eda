import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import ClientGateway from "../../gateway/client.gateway";
import { FindClientInputDto, FindClientOutputDto } from "./find-client.usecase.dto";

export default class FindClientUsecase implements UseCaseInterface {
  private _clientRepository: ClientGateway

  constructor(clientRepository: ClientGateway) {
    this._clientRepository = clientRepository
  }

  async execute(input: FindClientInputDto): Promise<FindClientOutputDto> {
    const result = await this._clientRepository.FindById(input.id)

    const returnClient: FindClientOutputDto = {
      id: result.id.id,
      name: result.name,
      email: result.email,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt
    }

    return returnClient
  }
}