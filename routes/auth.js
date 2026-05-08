import { Router } from "express"
import { Usuario } from '../models/UsuarioModels.js';


const router = Router()

router.get('/login', (req, res) => {
  res.render('auth/login')
})

router.post('/login', (req, res) => {
  //  lógica de autenticación

  // si esta todo bien luego de redirecciona al home
  res.redirect('/gastos')
})

router.get('/signup', (req, res) => {
  res.render('auth/signup')
})

router.get('/anonimo', (req, res) => {
  res.render('auth/anonimo')
})


router.post('/signup', (req, res) => {
  //  lógica de registro de usuario
  
  // si esta todo bien luego de redirecciona al home
  res.redirect('/gastos')
})



router.get('/test', async (req,res)=>{

   const usuario = await Usuario.create({
      firstName:'Gabi',
      lastName:'Bal',
      email:'gabi@gmail.com'
   });

   res.send(usuario);

});





export default router