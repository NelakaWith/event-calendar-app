// server/src/models/event.js
import { DataTypes } from "sequelize";
import sequelize from "../_db/sequelize.js";

export const Event = sequelize.define(
  "Event",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
    },
    timezone: {
      type: DataTypes.STRING,
    },
    is_recurring: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    recurrence_type: {
      type: DataTypes.ENUM("daily", "weekly", "monthly"),
      allowNull: true,
    },
    recurrence_until: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "events",
    timestamps: false,
  }
);
