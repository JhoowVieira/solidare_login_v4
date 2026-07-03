import { prisma } from '../config/db.js'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";



const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ error: "Token de acesso não fornecido" });
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({ error: "Formato de token inválido" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = decoded.id;

        const usuario = await prisma.usuario.findUnique({
            where: { id: decoded.id },
            select: {
                id: true,
                nome: true,
                email: true,
                role: true,
            },
        });

        if (!usuario) {
            return res.status(401).json({ error: "Usuário não encontrado" });
        }

        req.usuario = usuario;

        next();

    } catch (error) {
        console.error(error);

        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ error: "Token inválido" });
        }

        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ error: "Token expirado" });
        }

        return res.status(500).json({ error: "Erro interno do servidor" });
    }
};

export {authMiddleware}