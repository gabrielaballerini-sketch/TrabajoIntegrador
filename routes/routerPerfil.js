import { Router } from "express";

import { mostrarPerfil } from "../controller/perfilController.js";

const router=Router();

router.get('/', mostrarPerfil);

export default router;