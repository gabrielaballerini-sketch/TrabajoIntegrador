import { Model, DataTypes } from "sequelize";
import sequelize from "./config.js";

export class Seguidor extends Model { }

Seguidor.init(
  {
    seguido_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'usuarios', key: 'id' }

    },
  
    seguidor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'usuarios', key: 'id' }
    }
  
},
 
{
    sequelize,
    modelName: 'Seguidor',
    tableName: 'seguidores',
    createdAt: true,
    updatedAt:false,
   
    indexes: [
      {
        unique: true,
        fields: ['seguidor_id', 'seguido_id']

      }


    ]
  },


)
