/*
  Warnings:

  - The values [USUARIO] on the enum `RoleUsuario` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "TipoInstituicao" AS ENUM ('IGREJA', 'ASSOCIACAO', 'ONG', 'OUTRO');

-- CreateEnum
CREATE TYPE "StatusInstituicao" AS ENUM ('OK', 'PENDENTE');

-- AlterEnum
BEGIN;
CREATE TYPE "RoleUsuario_new" AS ENUM ('ADMIN', 'OPERADOR');
ALTER TABLE "public"."usuarios" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "usuarios" ALTER COLUMN "role" TYPE "RoleUsuario_new" USING ("role"::text::"RoleUsuario_new");
ALTER TYPE "RoleUsuario" RENAME TO "RoleUsuario_old";
ALTER TYPE "RoleUsuario_new" RENAME TO "RoleUsuario";
DROP TYPE "public"."RoleUsuario_old";
ALTER TABLE "usuarios" ALTER COLUMN "role" SET DEFAULT 'OPERADOR';
COMMIT;

-- AlterTable
ALTER TABLE "usuarios" ALTER COLUMN "role" SET DEFAULT 'OPERADOR';

-- CreateTable
CREATE TABLE "instituicoes_parceiras" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "tipo" "TipoInstituicao" NOT NULL DEFAULT 'OUTRO',
    "responsavel" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "statusOk" "StatusInstituicao" NOT NULL DEFAULT 'PENDENTE',
    "ativa" BOOLEAN NOT NULL DEFAULT true,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "instituicoes_parceiras_pkey" PRIMARY KEY ("id")
);
