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
   
 publicacion_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Publicaciones', key: 'id' }
    },


  
    
  },
  {
    sequelize, 
    modelName: 'ComentarioModels', 
    tableName: 'comentarios', 
    createdAt: true, 
    updatedAt: false,
    paranoid: true, //borrado logico
  },
);

