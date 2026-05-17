import { Model, DataTypes, STRING } from "sequelize";
import sequelize from "./config.js";

export class Mensaje extends Model {}

Mensaje.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    contenido: {
      type: DataTypes.TEXT,
       allowNull: false,
    },
    
    leido: {
      type: DataTypes.TEXT,
      defaultValue:false

    }
    
  },
  {
    sequelize, 
    modelName: 'Mensaje', 
    tableName: 'mensajes', 
    createdAt: true,
    updatedAt: true
  },
);

