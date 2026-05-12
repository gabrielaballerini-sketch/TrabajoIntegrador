import { Model, DataTypes } from "sequelize";
import sequelize from "./config.js";

export class Notificacion extends Model {}

Notificacion.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
//enum, me interesaa? 
tipo: {
      type: DataTypes.ENUM('cometario','like','seguidor'),
      allowNull: false,
    },
    leida: {
      type: DataTypes.BOOLEAN,
       allowNull: false,
    },



  },



{
    sequelize, 
    modelName: 'Notificacion', 
    tableName: 'notificaciones', 
    createdAt: true,
    updatedAt: false,
    
  },

);

