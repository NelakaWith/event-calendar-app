import dotenv from "dotenv";
import { Sequelize } from "sequelize";
dotenv.config();

const dialect = process.env.DB_DIALECT || "sqlite";
const storage = process.env.DB_STORAGE || ":memory:";

const sequelize =
  dialect === "sqlite"
    ? new Sequelize({ dialect, storage, logging: false })
    : new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASS,
        {
          host: process.env.DB_HOST,
          dialect,
          logging: false,
        }
      );

export default sequelize;
