import { Sequelize } from "sequelize-typescript";
import express, { Express } from "express";
import request from "supertest";
import { Umzug } from "umzug";
import { ClientModel } from "../../migrations/migrations/ClientModel";
import clientRouter from "../api/client";
import { migrator } from "../../migrations/config-migrations/migrator";
import { clientMockInput, clientMockInputNotAdd } from "../../client/mock/client.mock";
import MockDB from "../../@shared/mock/db.mock";

jest.mock('../../@shared/kafka/kafka.producer', () => {
  return jest.fn();
});

const mockKafkaProducer = require('../../@shared/kafka/kafka.producer');

describe("E2E test for client", () => {
  const app: Express = express()
  app.use(express.json())
  app.use("/client", clientRouter)

  let mockDb: any
  let sequelize: Sequelize
  let transaction: any;

  let migration: Umzug<any>;

  beforeEach(async () => {
    mockDb = await MockDB([ClientModel], true);
    transaction = mockDb.transaction;
  })

  afterEach(async () => {
    if (!migration || !sequelize) {
      return
    }
    migration = migrator(sequelize)
    await mockDb.down()
    await transaction.rollback();
    await mockDb.close();
  })

  it("should add a client", async () => {
    const input = clientMockInput

    mockKafkaProducer.mockImplementation(() => Promise.resolve());

    const response = await request(app)
      .post("/client")
      .send(input);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("John Doe");

  });


  it("should not add a product", async () => {
    const input = clientMockInputNotAdd

    mockKafkaProducer.mockImplementation(() => Promise.resolve());

    const response = await request(app)
      .post("/client")
      .send(input);


    expect(response.status).toBe(500);
  });

  it("should find a product", async () => {
    const input = clientMockInput
    mockKafkaProducer.mockImplementation(() => Promise.resolve());
    const response = await request(app)
      .post("/client")
      .send(input);


    expect(response.status).toBe(200);
    expect(response.body.id).toBe(input.id);

    const responseFind = await request(app)
      .get(`/client/${input.id}`)

    expect(responseFind.status).toBe(200);
    expect(responseFind.body.name).toBe("John Doe");
  });
});
