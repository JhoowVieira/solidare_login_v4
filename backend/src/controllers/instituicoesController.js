import { prisma } from "../config/db.js"
import bcrypt from "bcrypt"
import {generateToken} from '../utils/generateToken.js'

console.log(Object.keys(prisma));
console.log(prisma.instituicaoParceira);

const register = async (req, res) => {
    const {nome, email, tipo, responsavel, telefone, endereco, cidade} = req.body

    const instituicaoExiste = await prisma.instituicaoParceira.findUnique({
        where: {email: email},
    })

    if (instituicaoExiste) {
        return res.status(400).json({
            error: "Instituição já existente com esse email."
        })
    }

    const instituicao = await prisma.instituicaoParceira.create({
        data: {
            nome,
            email,
            tipo,
            responsavel,
            telefone,
            endereco,
            cidade,
        }
    })

    res.status(201).json({
        status: "sucesso",
        data: {
            instituicao: {
                id: instituicao.id,
                nome: instituicao.nome,
                email: instituicao.email
            }
        }
    })
}

export {register}