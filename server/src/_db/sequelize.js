import { Sequelize } from "sequelize";

const sequelize = new Sequelize("event_calendar_app", "root", "root", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

export default sequelize;
