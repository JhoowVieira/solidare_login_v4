import { z } from "zod";

export const criarBeneficiarioSchema = z.object({

    nomeCompleto: z
        .string()
        .trim()
        .min(3, "Nome completo deve ter no mínimo 3 caracteres.")
        .max(150, "Nome completo deve ter no máximo 150 caracteres."),

    cpf: z
        .string()
        .regex(/^\d{11}$/, "CPF deve conter exatamente 11 números."),

    dataNascimento: z.coerce.date(),

    logradouro: z
        .string()
        .trim()
        .min(3, "Logradouro deve ter no mínimo 3 caracteres.")
        .max(150, "Logradouro deve ter no máximo 150 caracteres."),

    numero: z
        .string()
        .trim()
        .min(1, "Número é obrigatório.")
        .max(10, "Número deve ter no máximo 10 caracteres."),

    complemento: z
        .string()
        .trim()
        .max(100, "Complemento deve ter no máximo 100 caracteres.")
        .optional()
        .or(z.literal("")),

    cep: z
        .string()
        .regex(/^\d{8}$/, "CEP deve conter exatamente 8 números.")
        .optional()
        .or(z.literal("")),

    regiao: z
        .string()
        .trim()
        .min(2, "Região deve ter no mínimo 2 caracteres.")
        .max(100, "Região deve ter no máximo 100 caracteres."),

    cidade: z
        .string()
        .trim()
        .min(2, "Cidade deve ter no mínimo 2 caracteres.")
        .max(100, "Cidade deve ter no máximo 100 caracteres."),

    uf: z.enum([
        "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
        "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
        "RS", "RO", "RR", "SC", "SP", "SE", "TO"
    ]),

    telefonePrincipal: z
        .string()
        .regex(/^\d{10,11}$/, "Telefone principal deve conter 10 ou 11 números."),

    telefoneSecundario: z
        .string()
        .regex(/^\d{10,11}$/, "Telefone secundário deve conter 10 ou 11 números.")
        .optional()
        .or(z.literal("")),

    email: z
        .string()
        .email("Email inválido.")
        .optional()
        .or(z.literal("")),

    tipoBeneficio: z.enum([
        "CESTA",
        "GRANEL",
        "AMBOS"
    ]),

    situacaoSocioeconomica: z
        .string()
        .trim()
        .max(500, "Situação socioeconômica deve ter no máximo 500 caracteres.")
        .optional()
        .or(z.literal("")),

    observacoes: z
        .string()
        .trim()
        .max(1000, "Observações devem ter no máximo 1000 caracteres.")
        .optional()
        .or(z.literal("")),

    ativo: z
        .boolean()
        .optional(),

    instituicaoId: z
        .number()
        .int()
        .positive()
        .optional()

});