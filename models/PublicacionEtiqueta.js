import { Model, DataTypes } from "sequelize";
import sequelize from "./config.js";

export class PublicacionEtiqueta extends Model { }

PublicacionEtiqueta.init(
  {

          publicacion_id: {
      type: DataTypes.INTEGER,
      primaryKey:true,
      

    },
  
    etiqueta_id: {
      type: DataTypes.INTEGER,
       primaryKey:true,
     
    }
  
},
 
{
    sequelize,
    modelName: 'PublicacionEtiqueta',
    tableName: 'publicacion_etiqueta',
    createdAt: false,
    updatedAt:false,
   


  
  },


)
