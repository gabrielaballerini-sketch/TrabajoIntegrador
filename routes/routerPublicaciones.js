import { Router } from "express"

import { mostrarFormulario,crearPublicacion } from "../controller/publicacionController.js";

import { auth } from "../middlewares/authMiddlewares.js";


const router = Router()

//me voy al controler y traigo esto:
//uso  middlewares del auth

router.get('/crear',auth, mostrarFormulario);

router.post('/crear',auth, crearPublicacion);




export default router;
