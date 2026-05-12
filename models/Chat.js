import { Model, DataTypes, STRING } from "sequelize";
import sequelize from "./config.js";

export class Chat extends Model {}

Chat.init(
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
    modelName: 'Chat', 
    tableName: 'chats', 
    createdAt: true, 
    updatedAt: false,
    paranoid: false, //borrado logico
  },
);

