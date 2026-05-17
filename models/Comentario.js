import { Model, DataTypes } from "sequelize";
import sequelize from "./config.js";

export class Comentario extends Model {}

Comentario.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    contenido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
   



  
    
  },
  {
    sequelize, 
    modelName: 'Comentario', 
    tableName: 'comentarios', 
    createdAt: true,
    updatedAt: true
  },
);

