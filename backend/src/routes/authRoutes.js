import express from "express";
import {register, login, logout} from '../controllers/authControllers.js'
import {authMiddleware} from '../middlewares/authMiddlewares.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.get('/me', authMiddleware, (req, res) => {
    res.status(200).json({
        mensagem: "Usuário autenticado",
        usuario: req.usuario
    })
})

export default router