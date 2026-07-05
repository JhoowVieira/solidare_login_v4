import express from "express";
import { instituicaoListar, instituicoesAll, register } from "../controllers/instituicoesController.js";
import { authorize, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/instituicoes", protect, authorize("ADMIN"), register);
router.get("/instituicoes", protect, authorize("ADMIN"), instituicoesAll);
router.get("/instituicoes/:id", protect,authorize("ADMIN"), instituicaoListar)

export default router;
