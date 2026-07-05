import { z } from "zod";

export const criarInstituicaoSchema = z.object({
  nome: z
    .string()
    .trim()
    .min(3, "O nome da instituição deve possuir no mínimo 3 caracteres.")
    .max(150, "O nome da instituição deve possuir no máximo 150 caracteres."),

  email: z
    .string()
    .trim()
    .email("Informe um e-mail válido.")
    .max(255, "O e-mail deve possuir no máximo 255 caracteres."),

  tipo: z.enum(
    ["IGREJA", "ASSOCIACAO", "ONG", "OUTRO"],
    {
      error: "Selecione um tipo de instituição."
    }
  ),

  responsavel: z
    .string()
    .trim()
    .min(5, "Informe o nome completo do responsável.")
    .max(120, "O nome do responsável deve possuir no máximo 120 caracteres.")
    .regex(/[A-Za-zÀ-ÿ]/, "O nome do responsável é inválido."),

  telefone: z
    .string()
    .trim()
    .regex(
      /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/,
      "Informe um telefone válido."
    ),

  endereco: z
    .string()
    .trim()
    .min(10, "Informe um endereço completo.")
    .max(255, "O endereço deve possuir no máximo 255 caracteres."),

  cidade: z
    .string()
    .trim()
    .min(2, "Informe a cidade.")
    .max(100, "A cidade deve possuir no máximo 100 caracteres.")
    .regex(/[A-Za-zÀ-ÿ]/, "Cidade inválida."),

  statusOk: z
  .enum(["OK", "PENDENTE"], {
    error: "Status deve ser 'OK' ou 'PENDENTE'."
  }).optional(),
});