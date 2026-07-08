import express from 'express'
import {cadastrarDoacao, detalheDeDoacao, listarDoacoes} from '../controllers/doacoesController.js'
import { authorize, protect } from '../middlewares/authMiddleware.js'

const router = express.Router();

router.post("/doacoes", protect, cadastrarDoacao)
router.get("/doacoes", protect, listarDoacoes)
router.get("/doacoes/:id", protect, detalheDeDoacao)

export default router