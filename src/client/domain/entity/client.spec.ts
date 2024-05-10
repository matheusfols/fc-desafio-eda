import ClientEntity from "./client.entity";

describe("client unit tests", () => {
  it("should create a client entity", () => {
    const client = new ClientEntity({
      name: "John Doe",
      email: "johndoe@teste.com"
    });

    expect(client).toBeDefined();
    expect(client.name).toBe("John Doe");
    expect(client.email).toBe("johndoe@teste.com");
  });

  it("should throw error when name is empty", () => {

    expect(() => {
      const input = {
        name: "",
        email: "joao@xpto.com",
      }
      const client = new ClientEntity(input);
    }).toThrowError("client: Name is required");

  });

  it("should throw error when email is empty", () => {

    expect(() => {
      const input = {
        name: "Joao",
        email: "",
      }
      const client = new ClientEntity(input);
    }).toThrowError("client: Email is required");

  });
});