import { Sequelize } from "sequelize-typescript";
import { Umzug, SequelizeStorage } from 'umzug';
import { migrator } from "../../migrations/config-migrations/migrator";

const MockDB = async (model: any[], runMigration?: boolean) => {
  let sequelize: Sequelize;
  let migration: any;

  sequelize = new Sequelize({
    database: process.env.DB_NAME,
    dialect: 'mysql',
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    logging: false,
  });

  await sequelize.addModels(model);

  if (runMigration) {
    // migration = migrator(sequelize)
    // await migration.up();
    // Executar as migrações
    const umzug = new Umzug({
      migrations: { glob: 'migrations/*.ts' },
      context: sequelize.getQueryInterface(),
      storage: new SequelizeStorage({ sequelize }),
      logger: console,
    });
    await umzug.up();
  }

  // await sequelize.sync();

  return {
    transaction: await sequelize.transaction(),
    close: async () => await sequelize.close(),
    down: async () => await migration.down(),
  };
}

export default MockDB;