import { Router } from "express"
import { Usuario } from '../models/Usuario.js';
import { signup } from "../controller/auth.js";



const router = Router()


router.post('/signup',signup)

router.get('/login', (req, res) => {
  res.render('auth/login')
})



router.get('/signup', (req, res) => {
  res.render('auth/signup')
})

router.get('/anonimo', (req, res) => {
  res.render('auth/anonimo')
})




router.post('/login',(req,res)=>{
res.redirect('/home')


})






router.get('/test', async (req,res)=>{

   const usuario = await Usuario.create({
      Nombre:'Gabi',
      Apellido:'Bal',
      email:'gabi@gmail.com'
   });

   res.send(usuario);

});





export default router