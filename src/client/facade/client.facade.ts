import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import ClientFacadeInterface, { AddClientFacadeInputDto, FindClientFacadeInputDto, FindClientFacadeOutputDto } from "./client.facade.interface";

export interface UseCaseProps {
  addUsecase: UseCaseInterface;
  findUsecase: UseCaseInterface;
}

export default class ClientFacade implements ClientFacadeInterface {
  private _findUsecase: UseCaseInterface;
  private _addUsecase: UseCaseInterface;

  constructor(usecaseProps: UseCaseProps) {
    this._addUsecase = usecaseProps.addUsecase;
    this._findUsecase = usecaseProps.findUsecase;
  }

  add(input: AddClientFacadeInputDto): Promise<void> {
    return this._addUsecase.execute(input);
  }

  find(input: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDto> {
    return this._findUsecase.execute(input);
  }
}