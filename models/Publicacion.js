import { Model, DataTypes } from "sequelize";
import sequelize from "./config.js";

export class Publicacion extends Model {}

Publicacion.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
       allowNull: true,
    },
    comentarios_abiertos: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,// los comentarios abiertos x defecto
     
    },
    estado: {
    type: DataTypes.ENUM('activa', 'en_revision', 'dada_de_baja'),
    defaultValue: 'activa',
    allowNull: false,
    },
    modificable: {
    type: DataTypes.BOOLEAN,
     defaultValue: true, // se pone en false cuando recibe la primera denuncia
    }




 
    
  },
  {
    sequelize, 
    modelName: 'Publicacion', 
    tableName: 'publicaciones', 
     createdAt: true,
    updatedAt: true,
    paranoid: true
  },
);

