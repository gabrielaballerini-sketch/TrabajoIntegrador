import express from 'express';
import { auth } from '../middlewares/authMiddlewares.js';
import { crearDenuncia } from '../controller/denunciaController.js';

const router = express.Router();

router.post('/crear', auth, crearDenuncia);

export default router;