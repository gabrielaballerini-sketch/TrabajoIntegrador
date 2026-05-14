import{Usuario} from '../models/Usuario.js'


export const signup=async(req,res)=>{

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


})


}

await Usuario.create({

nombre,
apellido,
email,
password


});

res.redirect('/auth/login')

}