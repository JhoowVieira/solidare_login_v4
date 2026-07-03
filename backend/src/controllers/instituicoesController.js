import { prisma } from "../config/db.js"
import bcrypt from "bcrypt"
import {generateToken} from '../utils/generateToken.js'
import {createPassword} from '../utils/generatePassword.js'

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

    const senhagerada = createPassword()

    const senhaHash = await bcrypt.hash(senhagerada, 10)

    const novoUsuario = await prisma.usuario.create({
        data: {
            nome: responsavel,
            email,
            senhaHash,
            role: 'INSTITUICAO',
            instituicao: {
                create: {
                    nome,
                    email,
                    tipo,
                    responsavel,
                    telefone,
                    endereco,
                    cidade,
                }
            }
        },
        include: {
            instituicao: true
        }
    })

    res.status(201).json({
        mensagem: "Instituição cadastrada com sucesso!",
        email: novoUsuario.email,
        senhaProvisoria: senhagerada
    })
}

export {register}