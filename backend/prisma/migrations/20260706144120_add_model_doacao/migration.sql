-- CreateTable
CREATE TABLE "doacoes" (
    "id" SERIAL NOT NULL,
    "dataDoacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "beneficiarioId" INTEGER NOT NULL,
    "instituicaoId" INTEGER NOT NULL,
    "tipoDoacao" "TipoBeneficio" NOT NULL DEFAULT 'CESTA',
    "observacoes" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "doacoes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "doacoes_dataDoacao_idx" ON "doacoes"("dataDoacao");

-- CreateIndex
CREATE INDEX "doacoes_beneficiarioId_idx" ON "doacoes"("beneficiarioId");

-- CreateIndex
CREATE INDEX "doacoes_instituicaoId_idx" ON "doacoes"("instituicaoId");

-- AddForeignKey
ALTER TABLE "doacoes" ADD CONSTRAINT "doacoes_beneficiarioId_fkey" FOREIGN KEY ("beneficiarioId") REFERENCES "beneficiarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doacoes" ADD CONSTRAINT "doacoes_instituicaoId_fkey" FOREIGN KEY ("instituicaoId") REFERENCES "instituicoes_parceiras"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
