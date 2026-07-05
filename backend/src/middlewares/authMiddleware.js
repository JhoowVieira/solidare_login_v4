import { prisma } from '../config/db.js'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import { error } from 'node:console';
import { Result } from 'pg';


// Middleware responsável por verificar se o usuário está autenticado.
// Middleware é uma função que executa antes da rota.
// Ele pode: 
// - permitir o acesso; 
// - bloquear o acesso; 
// - adicionar informações à requisição.
const protect = async (req, res, next) => {
    try {
        // Obtém o cabeçalho Authorization enviado pelo cliente.
        // Exemplo: 
        // Authorization: Bearer eyJhbGciOiJIUzI1Ni...
        const authHeader = req.headers.authorization;

        // Verifica se o cabeçalho foi enviado.
        if (!authHeader) {
            return res.status(401).json({ error: "Você precisa estar logado para acessar este recurso." });
        }

        // Separa o texto pelo espaço.
        // Antes: 
        // "Bearer eyJhbGciOiJIUzI1Ni..."
        // Depois: 
        // ["Bearer", "eyJhbGciOiJIUzI1Ni..."] 
        // [1] pega apenas o Token.
        const token = authHeader.split(" ")[1];

        // Verifica se o Token realmente existe.
        if (!token) {
            return res.status(401).json({ error: "Formato de token inválido" });
        }

        // Verifica se o Token é válido. // 
        // Também verifica: 
        // ✔ assinatura 
        // ✔ data de expiração 
        // ✔ chave secreta (JWT_SECRET)
        // Se estiver tudo certo, 
        // retorna os dados armazenados no Token.
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        

        // Procura o usuário no banco usando o ID 
        // armazenado no Token.
        const usuario = await prisma.usuario.findUnique({
            where: { id: decoded.id },

            // Retorna apenas os campos necessários. 
            // Isso evita trazer informações desnecessárias, 
            // como a senha.
            select: {
                id: true,
                nome: true,
                email: true,
                role: true,
                ativo: true
            },
        });

        // Caso o usuário não exista mais no banco.
        if (!usuario) {
            return res.status(401).json({ error: "Usuário não encontrado" });
        }

        // Verifa se está ativo
        if (!usuario.ativo) {
            return res.status(401).json({
                error: "Usuário desativado"
            })
        }

        // Salva os dados do usuário dentro da requisição.
        // Assim outras rotas poderão acessar: 
        // req.usuario.nome 
        // req.usuario.email 
        // req.usuario.role
        req.user = usuario;

        // Salva o ID do usuário na requisição.
        // Agora qualquer rota poderá acessar: 
        // req.userId
        req.userId = decoded.id;

        // Continua para a próxima função 
        // (normalmente a rota).
        next();

    } catch (error) {
        // Exibe o erro no console.
        console.error(error);

        // Token inválido ou alterado.
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ error: "Token inválido" });
        }

        // Token expirado.
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ error: "Token expirado" });
        }

        // Qualquer outro erro.
        return res.status(500).json({ error: "Erro interno do servidor" });
    }
};

// Middleware responsável por verificar se o usuário 
// possui a permissão (role) necessária para acessar uma rota. 
// role = cargo ou nível de acesso do usuário.
const authorize = (role) => {
    // Retorna um middleware que será executado 
    // antes da rota protegida.
    return (req, res, next) => {

        // Obtém o cargo do usuário autenticado.
        // Esse dado foi adicionado pelo authMiddleware: 
        // req.usuario = usuario;
        if (!req.user) {
            return res.status(401).json({
                error: "Usuário não autenticado"
            })
        }

        // Verifica se o usuário possui a permissão exigida.
        if (req.user.role !== role) {
            // Código HTTP 403 = Forbidden (Acesso proibido). 
            // O usuário está autenticado, 
            // mas não tem permissão para acessar esta rota.
            return res.status(403).json({error: "Você não possui permissão para acessar este recurso."})
        }

        // Permissão concedida. 
        // Continua para a próxima função (rota).
        next()
    }
}


export {protect, authorize}