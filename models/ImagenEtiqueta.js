import { Model, DataTypes } from "sequelize";
import sequelize from "./config.js";

export class ImagenEtiqueta extends Model { }

ImagenEtiqueta.init(
  {

  
   


    imagen_id: {
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
    modelName: 'ImagenEtiqueta',
    tableName: 'Imagenes_Etiquetas',
    createdAt: true,
    updatedAt:false,
   


  
  },


)
