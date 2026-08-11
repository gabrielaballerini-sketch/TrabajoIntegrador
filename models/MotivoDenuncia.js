import { Model, DataTypes } from "sequelize";
import sequelize from "./config.js";

export class MotivoDenuncia extends Model {}

MotivoDenuncia.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    descripcion: {
      type: DataTypes.STRING(255),
    },
  },
  {
    sequelize,
    modelName: 'MotivoDenuncia',
    tableName: 'motivos_denuncia',
    timestamps: false,
  }
);