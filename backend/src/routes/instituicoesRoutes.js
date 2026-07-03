import express from "express";
import { register } from "../controllers/instituicoesController.js";
import { authMiddleware, verifyRole } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/instituicoes", authMiddleware, verifyRole("ADMIN"), register);

export default router;
