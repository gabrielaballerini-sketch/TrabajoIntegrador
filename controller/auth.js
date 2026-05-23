

import { Usuario } from '../models/Usuario.js';


// MOSTRAR LOGIN
export const mostrarLogin = (req,res)=>{

    res.render('auth/login');
}



// LOGIN
export const login = async(req,res)=>{

    try{

    const {email,password} = req.body;

    const usuario = await Usuario.findOne({
        where:{email}
    });

    // VALIDAR EMAIL
    if(!usuario){

        return res.render('auth/login',{
            error:'El usuario no existe'
        });
    }

    // VALIDAR PASSWORD
    // PROVISORIO
    if(usuario.password !== password){

        return res.render('auth/login',{
            error:'Contraseña incorrecta'
        });
    }

 


    req.session.usuario={
    id:usuario.id,
    nombre:usuario.nombre,
    apellido:usuario.apellido,
    email:usuario.email

    }

 

    res.redirect('/home');
}catch(err){
console.error("Error al ingreso",err);

res.send("Error loginnn ")

}



}




export const signup = async(req,res)=>{

    console.log(req.body);

    const{
        nombre,
        apellido,
        email,
        password,
        confPassword

    }=req.body;



    if(password!==confPassword){

        return res.render('auth/signup',{
            error:'Las contraseñas no coinciden'
        });
    }



    const existe=await Usuario.findOne({
        where:{email}
    });

    if(existe){

        return res.render('auth/signup',{
            error:'El email ya esta registrado'
        });
    }

    await Usuario.create({

        nombre,
        apellido,
        email,
        password

    });

    res.redirect('/auth/login');

}



// LOGOUT
export const logout = (req,res)=>{

    req.session.destroy(()=>{

    res.redirect('/auth/login');
})
}