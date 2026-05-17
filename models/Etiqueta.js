import { Model, DataTypes } from "sequelize";
import sequelize from "./config.js";

export class Etiqueta extends Model {}

// esta es mi #

Etiqueta.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    }

  },
  {
    sequelize, 
    modelName: 'Etiqueta', 
    tableName: 'etiquetas', 
    createdAt: true, 
    updatedAt: true,
    
  },
);

