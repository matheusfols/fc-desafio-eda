import { Sequelize } from "sequelize-typescript";
import { migrator } from "./migrator";

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  dialect: 'mysql',
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  logging: true,
  sync: { force: true }
});

migrator(sequelize).runAsCLI();