import { Router } from "express"

import { mostrarFormulario,crearPublicacion } from "../controller/publicacionController.js";


const router = Router()

//me voy al controler y traigo esto: 

router.get('/crear',mostrarFormulario);

router.post('/crear',crearPublicacion);


export default router;
