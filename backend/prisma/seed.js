import {prisma} from '../src/config/db.js'
import bcrypt from 'bcrypt'

async function main() {
    const senhaHash = await bcrypt.hash("admin123", 10)

    await prisma.usuario.create({
        data: {
            nome: "Administrador",
            email: "admin@institutosolidare.org",
            senhaHash,
            role: "ADMIN"
        }
    })
    console.log("Admin criado com sucesso")
}

main()