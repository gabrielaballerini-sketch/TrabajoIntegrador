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
      type: DataTypes.ENUM('cometario','valoracion','seguidor','denuncia'),
      allowNull: false,
    },
    leida: {
      type: DataTypes.BOOLEAN,
       allowNull: false,
    },

 usuario_id:{
type:DataTypes.INTEGER,
allowNull:false,

 },
   
 texto:{
type:DataTypes.STRING,
allowNull:false,

 },

 fecha_lectura:{

type:DataTypes.DATE,
allowNull:true


 }
  



  },



{
    sequelize, 
    modelName: 'Notificacion', 
    tableName: 'notificaciones', 
    createdAt: true,
    updatedAt: false,
    
  },

);

