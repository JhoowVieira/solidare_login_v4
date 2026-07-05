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

    const senhaGerada = createPassword()

    const senhaHash = await bcrypt.hash(senhaGerada, 10)

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
        senhaProvisoria: senhaGerada
    })
}

const instituicoesAll = async (req, res) => {
    try {
        const instituicoes = await prisma.instituicaoParceira.findMany()
        return res.status(200).json(instituicoes)
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao listar as instituições'})
    }
}

const instituicaoListar = async (req, res) => {
    const id = Number(req.params.id)

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            error: 'ID inválido. Use um inteiro positivo'
        })
    }

    try {
        const instituicao = await prisma.instituicaoParceira.findUnique({ where: {id}})

        if (!instituicao) {
            return res.status(404).json({ error: 'Instituição não encontrada'})
        }

        return res.status(200).json(instituicao)
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar instituição'})
    }
}

export {register, instituicoesAll, instituicaoListar}