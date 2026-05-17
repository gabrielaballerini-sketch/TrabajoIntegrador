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


    //PONGO.TEXT X AHORA PROVISORIO..
    //LUEGO VEO SI VUELVO A BLOB
    /*data: {
      type: DataTypes.BLOB('long'),
       allowNull: false,
    },
    */

     data: {
      type: DataTypes.TEXT,
       allowNull: false,
      },




    licencia: {
      type: DataTypes.ENUM('copyright', 'sincopyright'),
      allowNull: false,
      defaultValue:'sincopyright'
     
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
     updatedAt: true
  },
);

