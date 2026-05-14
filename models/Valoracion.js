import { Model, DataTypes } from "sequelize";
import sequelize from "./config.js";

export class Valoracion extends Model {}

Valoracion.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },



puntaje:{
type:DataTypes.INTEGER,
allowNull:false,
validate:{
min:1,
max:5,

},
},




},



{
    sequelize, 
    modelName: 'Valoracion', 
    tableName: 'valoraciones', 
    createdAt: true, 
    updatedAt: false,


indexes:[{
unique:true,
fields:['usuario_id','imagen_id']
}
]





    
  },

);

