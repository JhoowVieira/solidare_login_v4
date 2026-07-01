import { prisma } from "../config/db.js"
import bcrypt from "bcrypt"

const register = async (req, res) => {
    // Pega os dados enviados pelo cliente no corpo da requisição.
    const {nome, email, senhaHash} = req.body

    // Procura no banco de dados um usuário com o mesmo e-mail. 
    // findUnique() retorna: 
    // - O usuário, se encontrar. 
    // - null, se não existir.
    const userExists = await prisma.usuario.findUnique({
        where: {email: email},
    })

    // Se já existir um usuário com esse e-mail, 
    // interrompe a execução e retorna um erro.
    if (userExists) {
        return res
        // Código HTTP 400 = Requisição inválida. 
        // Neste caso, porque o e-mail já está cadastrado.
        .status(400)
        // Envia uma resposta em formato JSON informando o erro.
        .json({ error: "Usuario ja exister com esse email"})
    }
    

    // Gera um "salt" (sal) para fortalecer a criptografia da senha. 
    // O salt é um valor aleatório adicionado à senha antes de criptografá-la. 
    // Isso faz com que duas pessoas com a mesma senha tenham hashes diferentes, aumentando a segurança contra ataques.
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(senhaHash, salt)
    
    // Cria um novo usuário no banco de dados.
    // create() insere um novo registro na tabela "usuario". 
    // Os dados enviados estão dentro da propriedade "data".
    const usuario = await prisma.usuario.create({
        data: {
            nome,
            email,
            // Salva a senha criptografada (hash), 
            // nunca a senha original.
            senhaHash: hashedPassword,
        }
    })
    // Retorna uma resposta indicando que o cadastro foi realizado com sucesso.
    res.status(201).json({
        // Código HTTP 201 = Recurso criado com sucesso.
        status: "sucesso",
        // Dados que serão enviados para o cliente.
        data: {
            usuario: {
                id: usuario.id,
                nome: nome,
                email: email,
                // A senha NÃO é enviada na resposta por segurança.
            }
        }
    })
}

const login = async (req, res) => {
    const {email, senhaHash} = req.body

    const usuario = await prisma.usuario.findUnique({
        where: {email: email},
    })

    if (!usuario) {
        return res
        // Código HTTP 400 = Requisição inválida. 
        // Neste caso, porque o e-mail já está cadastrado.
        .status(400)
        // Envia uma resposta em formato JSON informando o erro.
        .json({ error: "Senha ou email inválido"})
    }
}

export {register, login}