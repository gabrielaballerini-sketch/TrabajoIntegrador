import { Model, DataTypes } from "sequelize";
import sequelize from "./config.js";

export class Usuario extends Model {}

Usuario.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING(50),
      allowNull: false
    },

    contrasena: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING, //255
      allowNull: false,
      unique: true,
    },
    telefono: {
      type: DataTypes.STRING,
    },
    nacimiento: {
      type: DataTypes.DATEONLY,
    },
    rol: {
      type: DataTypes.ENUM('validador', 'usuario'),
    },
    activo:{
    type:DataTypes.BOOLEAN

    },
  
    avatar: {
      type: DataTypes.BLOB,
    }
  },
  {
    sequelize, // necesario para conectarse a la bd
    modelName: 'UsuarioModels', // nombre del modelo
    tableName: 'usuarios', // nombre de la tabla
    createdAt: true, // cada vez que crea un usuario coloca la fecha de creacion
    paranoid: true, //o deleatat?? cada vez que se elimina un usuario coloca la fecha de eliminacion
  },
);

