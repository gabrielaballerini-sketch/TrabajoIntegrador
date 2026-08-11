

import { Model, DataTypes } from "sequelize";
import sequelize from "./config.js";

export class Denuncia extends Model {}


Denuncia.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
 usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },


    tipo: {
      type: DataTypes.ENUM('comentario','imagen','usuario'),
     allowNull:false
    },

// con esto vamos a buscar el id del elemento

elemento_id:{
type:DataTypes.INTEGER,
allowNull:false

},



motivo_id: {
  type: DataTypes.INTEGER,
  allowNull: false,
},

descripcion:{
type:DataTypes.TEXT

},


estado:{
type:DataTypes.ENUM('pendiente','desestimado','ejecutado'),
defaultValue:'pendiente'

  },
  },
  {
    sequelize, 
    modelName: 'Denuncia', 
    tableName: 'denuncia', 
    createdAt: true,
    updatedAt: true
  },
);

