/*
  Warnings:

  - A unique constraint covering the columns `[instituicaoId]` on the table `usuarios` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
ALTER TYPE "RoleUsuario" ADD VALUE 'INSTITUICAO';

-- AlterTable
ALTER TABLE "usuarios" ADD COLUMN     "instituicaoId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_instituicaoId_key" ON "usuarios"("instituicaoId");

-- AddForeignKey
ALTER TABLE "usuarios" ADD CONSTRAINT "usuarios_instituicaoId_fkey" FOREIGN KEY ("instituicaoId") REFERENCES "instituicoes_parceiras"("id") ON DELETE SET NULL ON UPDATE CASCADE;
