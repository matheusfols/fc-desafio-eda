import Id from "../../@shared/value-object/id.value-object"
import ClientEntity from "../domain/entity/client.entity"

const clientMockInput = {
  id: new Id().id,
  name: "John Doe",
  email: "johndoe@teste.com"
}

const clientMockInputNotAdd = {
  id: new Id().id,
  name: "",
  email: "johndoe@teste.com"
}

const clientMockInput1 = {
  name: "John Doe",
  email: "johndoe@teste.com"
}

const clientMockInput2 = {
  name: "Marie Doe",
  email: "marie@doe.com"
}

const clientMock1 = new ClientEntity(clientMockInput1)
const clientMock2 = new ClientEntity(clientMockInput2)

const MockClientRepository = () => {
  return {
    Save: jest.fn(),
    FindById: jest.fn().mockReturnValue(Promise.resolve(clientMock1))
  }
}


export { clientMockInput, clientMockInput1, clientMockInput2, clientMock1, clientMock2, clientMockInputNotAdd, MockClientRepository }