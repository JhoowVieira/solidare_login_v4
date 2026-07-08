-- CreateTable
CREATE TABLE "doacoes" (
    "id" SERIAL NOT NULL,
    "codigo" TEXT NOT NULL,
    "beneficiarioId" INTEGER NOT NULL,
    "instituicaoId" INTEGER NOT NULL,
    "tipo" "TipoBeneficio" NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "observacoes" TEXT,
    "comprovante" BOOLEAN NOT NULL DEFAULT false,
    "dataDoacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "doacoes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "doacoes_codigo_key" ON "doacoes"("codigo");

-- CreateIndex
CREATE INDEX "doacoes_beneficiarioId_idx" ON "doacoes"("beneficiarioId");

-- CreateIndex
CREATE INDEX "doacoes_instituicaoId_idx" ON "doacoes"("instituicaoId");

-- CreateIndex
CREATE INDEX "doacoes_dataDoacao_idx" ON "doacoes"("dataDoacao");

-- AddForeignKey
ALTER TABLE "doacoes" ADD CONSTRAINT "doacoes_beneficiarioId_fkey" FOREIGN KEY ("beneficiarioId") REFERENCES "beneficiarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doacoes" ADD CONSTRAINT "doacoes_instituicaoId_fkey" FOREIGN KEY ("instituicaoId") REFERENCES "instituicoes_parceiras"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
