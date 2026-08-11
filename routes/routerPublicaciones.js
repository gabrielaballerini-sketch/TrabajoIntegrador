import { Router } from "express"

import { mostrarFormulario, crearPublicacion, eliminarPublicacion, mostrarFormularioEditar, editarPublicacion } from "../controller/publicacionController.js";

import { auth } from "../middlewares/authMiddlewares.js";

import { upload } from "../middlewares/multerMiddlewares.js";



const router = Router()

// 
//USO EL middlewares multer para guardar imagenes temporales en memoria ram



//me voy al controler y traigo esto:
//uso  middlewares del auth, verifico si el usuario inicio sesion para pasar

router.get('/crear',auth, mostrarFormulario);

router.post('/crear', auth, upload.array('imgs'), crearPublicacion);

router.post('/:id/eliminar', auth, eliminarPublicacion);

router.get('/:id/editar', auth, mostrarFormularioEditar);

router.post('/:id/editar', auth, upload.array('imgs'), editarPublicacion);



export default router;
