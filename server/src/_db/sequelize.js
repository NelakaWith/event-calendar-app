import dotenv from "dotenv";
import { Sequelize } from "sequelize";
dotenv.config();

const dialect = process.env.DB_DIALECT || "mysql";
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
          port: process.env.DB_PORT, // Added port for MySQL
          dialect,
          logging: false,
        }
      );

export default sequelize;
