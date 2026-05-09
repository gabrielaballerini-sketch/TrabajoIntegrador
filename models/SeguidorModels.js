import { Model, DataTypes } from "sequelize";
import sequelize from "./config.js";

export class Seguidor extends Model { }

Seguidor.init(
  {
    Seguido_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'usuarios', key: 'id' }

    },
  
    Seguido_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'usuarios', key: 'id' }
    }
  
},
 
{
    sequelize,
    modelName: 'SeguidorModels',
    tableName: 'seguidores',
    createdAt: true,
    updateAt:false,
    paranoid: false,
    indexes: [
      {
        unique: true,
        fields: ['seguidor_id', 'seguido_id']

      }


    ]
  },


)
