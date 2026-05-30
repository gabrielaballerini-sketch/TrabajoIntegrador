import express from 'express';

import {valorarImagen} from '../controller/valoracionController.js';

import { auth } from '../middlewares/authMiddlewares.js';


const router = express.Router();

router.post('/imagenes/:imagenId/valorar',auth, valorarImagen);

export default router;