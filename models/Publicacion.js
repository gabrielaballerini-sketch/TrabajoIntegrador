import { Model, DataTypes } from "sequelize";
import sequelize from "./config.js";

export class Publicacion extends Model {}

Publicacion.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
       allowNull: true,
    },
    comentarios_abiertos: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,// los comentarios abiertos x defecto
     
    }
 
    
  },
  {
    sequelize, 
    modelName: 'Publicacion', 
    tableName: 'publicaciones', 
    createdAt: true, 
    updatedAt: false,
    paranoid: true, //borrado logico
  },
);

