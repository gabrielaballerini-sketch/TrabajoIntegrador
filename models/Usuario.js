import { Model, DataTypes } from "sequelize";
import sequelize from "./config.js";
import bcrypt from 'bcrypt';


export class Usuario extends Model {

 async validatePassword(password){
    return await bcrypt.compare(password,this.password);
  }

}




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

    password: {
      type: DataTypes.STRING,// 255
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
      type: DataTypes.ENUM('validador', 'usuario','administrador'),
     defaultValue:'usuario'
    },
   
    activo:{
    type:DataTypes.BOOLEAN,
    defaultValue:true

    },
  

  },
  {
    sequelize, // necesario para conectarse a la bd
    modelName: 'Usuario', // nombre del modelo
    tableName: 'usuarios', // nombre de la tabla
    createdAt: true, // cada vez que crea un usuario coloca la fecha de creacion
    paranoid: true, //o deleatat?? cada vez que se elimina un usuario coloca la fecha de eliminacion
    
    //29/05



 hooks:{
    beforeSave: async(usuario)=>{

      // solo si cambió el password
      if(!usuario.changed('password')) return;

      const salt = await bcrypt.genSalt(10);

      const hashedPassword = await bcrypt.hash(
        usuario.password,
        salt
      );

      usuario.password = hashedPassword;
    }


    }

      
   
  
  
  
  }
);

