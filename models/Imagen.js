import { Model, DataTypes } from "sequelize";
import sequelize from "./config.js";

export class Imagen extends Model {}

Imagen.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    data: {
      type: DataTypes.BLOB('long'),
       allowNull: false,
    },
    licencia: {
      type: DataTypes.ENUM('copyright', 'creative_commons', 'dominio_publico'),
      allowNull: false,
     
    },
    marca_agua: {
      type: DataTypes.STRING,

    }
    
  },
  {
    sequelize, 
    modelName: 'Imagen', 
    tableName: 'imagenes', 
    createdAt: true, 
    updatedAt: false,
    paranoid: true, //borrado logico
  },
);

