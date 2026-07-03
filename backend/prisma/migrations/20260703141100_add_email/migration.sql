/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `instituicoes_parceiras` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `instituicoes_parceiras` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "instituicoes_parceiras" ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "instituicoes_parceiras_email_key" ON "instituicoes_parceiras"("email");
