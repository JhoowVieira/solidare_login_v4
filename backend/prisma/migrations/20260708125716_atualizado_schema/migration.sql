/*
  Warnings:

  - Added the required column `usuarioId` to the `doacoes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "doacoes" ADD COLUMN     "usuarioId" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "doacoes_usuarioId_idx" ON "doacoes"("usuarioId");

-- CreateIndex
CREATE INDEX "doacoes_instituicaoId_dataDoacao_idx" ON "doacoes"("instituicaoId", "dataDoacao");

-- AddForeignKey
ALTER TABLE "doacoes" ADD CONSTRAINT "doacoes_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
