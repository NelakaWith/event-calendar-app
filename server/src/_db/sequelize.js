import dotenv from "dotenv";
import { Sequelize } from "sequelize";
dotenv.config();

console.log("[Sequelize] DB_DIALECT:", process.env.DB_DIALECT);
console.log("[Sequelize] DB_STORAGE:", process.env.DB_STORAGE);
console.log("[Sequelize] DB_NAME:", process.env.DB_NAME);
console.log("[Sequelize] DB_USER:", process.env.DB_USER);
console.log("[Sequelize] DB_PASS:", process.env.DB_PASS);
console.log("[Sequelize] DB_HOST:", process.env.DB_HOST);

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
          dialect,
          logging: false,
        }
      );

export default sequelize;
