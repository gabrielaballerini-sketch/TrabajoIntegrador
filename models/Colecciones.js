

import { Model, DataTypes } from "sequelize";
import sequelize from "./config.js";

export class Colecciones extends Model {}


Colecciones.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    nombre: {
      type: DataTypes.STRING(60),
    allowNull:false,
    }
},
    

  {
    sequelize, 
    modelName: 'Coleccion', 
    tableName: 'colecciones', 
    createdAt: true, 
    updatedAt: false,
    paranoid: false, //borrado logico
  },
);

