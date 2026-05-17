import { Model, DataTypes } from "sequelize";
import sequelize from "./config.js";

export class ColeccionPublicacion extends Model { }

ColeccionPublicacion.init(
  {

  
   


    coleccion_id: {
      type: DataTypes.INTEGER,
      primaryKey:true,
      

    },
  
    publicacion_id: {
      type: DataTypes.INTEGER,
       primaryKey:true,
     
    }
  
},
 
{
    sequelize,
    modelName: 'ColeccionPublicacion',
    tableName: 'colecciones_publicaciones',
    createdAt: true,
    updatedAt:false,
   
   
  
  },


)
