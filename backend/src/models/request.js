// Request.ts
import { DataTypes } from "sequelize";
import sequelize from "../data/sequelize.js";
import User from "./user.js";

const Request = sequelize.define("Request", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  startDate: { type: DataTypes.DATE, allowNull: false, field: 'start_date' },
  endDate: { type: DataTypes.DATE, allowNull: false, field: 'end_date' },
  reason: { type: DataTypes.STRING },
  status: { type: DataTypes.STRING, allowNull: false },
  userId: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: "users", key: "id" },
    field: 'user_id'
  },
    validatorId: { 
    type: DataTypes.INTEGER,
    references: { model: "users", key: "id" },
    field: 'validator_id'
  },
}, {
  tableName: "requests",
  timestamps: true, // disable auto timestamps
  underscored: true,

});

// Define associations
User.hasMany(Request, { foreignKey: "userId" });
Request.belongsTo(User, { foreignKey: "userId" });

export default Request;
