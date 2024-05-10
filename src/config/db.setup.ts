import { Sequelize } from "sequelize-typescript";
import { Umzug, SequelizeStorage } from 'umzug';
import { ClientModel } from "../migrations/migrations/ClientModel";
import { migrator } from "../migrations/config-migrations/migrator";

const setupDb = async () => {
  let sequelize: Sequelize;
  let migration: any;

  sequelize = new Sequelize({
    database: process.env.DB_NAME,
    dialect: 'mysql',
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    logging: false,
  });

  await sequelize.addModels([
    ClientModel
  ]);

  // await sequelize.sync();
  migration = migrator(sequelize)
  await migration.up()

  return {
    transaction: await sequelize.transaction(),
    close: async () => await sequelize.close(),
    down: async () => await migration.down(),
  };
}

export default setupDb;