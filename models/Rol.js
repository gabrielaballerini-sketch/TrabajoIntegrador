import { Model, DataTypes } from "sequelize";
import sequelize from "./config.js";

export class Rol extends Model {}

Rol.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    descripcion: {
      type: DataTypes.STRING(255),
    },
  },
  {
    sequelize,
    modelName: 'Rol',
    tableName: 'roles',
    timestamps: false, // los roles no necesitan createdAt , updatedAt
  }
);