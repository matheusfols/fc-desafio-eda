import e from "express";
import { clientMock1, clientMockInput, MockClientRepository } from "../../mock/client.mock";
import ClientRepository from "../../repository/client.repository";
import SaveClientUsecase from "../save-client/save-client.usecase";
import FindClientUsecase from "./find-client.usecase";

describe("FindClientUsecase", () => {
  it("should find a client", async () => {
    const repository = MockClientRepository()

    const findClientUsecase = new FindClientUsecase(repository);

    const find = {
      id: clientMock1.id.id
    }

    const result = await findClientUsecase.execute(find)

    expect(repository.FindById).toHaveBeenCalled()
    expect(clientMock1.id.id).toEqual(result.id)
    expect(clientMock1.name).toEqual(result.name)
  })

})