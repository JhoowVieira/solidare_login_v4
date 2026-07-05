import express from "express";
import { register, listarInstituicoes, detalheDaInstituicao, atualizarDadosInstituicao, removeInstituicao, atualizaStatus } from "../controllers/instituicoesController.js";
import { authorize, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/instituicoes", protect, authorize("ADMIN"), listarInstituicoes);
router.get("/instituicoes/:id", protect, authorize("ADMIN"), detalheDaInstituicao)
router.post("/instituicoes", protect, authorize("ADMIN"), register);
router.put("/instituicoes/:id", protect, authorize("ADMIN"), atualizarDadosInstituicao)
router.patch("/instituicoes/:id/status_ok", protect, authorize("ADMIN"), atualizaStatus)
router.delete("/instituicoes/:id", protect, authorize("ADMIN"), removeInstituicao)

export default router;
