import express from "express";
import { config } from "dotenv";
import { connectDB, disconnectDB } from "./config/db.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";

// Importando Rotas
import authRoutes from "./routes/authRoutes.js";
import instituicoesRoutes from "./routes/instituicoesRoutes.js";

// Carrega as variáveis de ambiente do arquivo .env
config();

// Conecta a aplicação ao banco de dados
connectDB();

// Cria a aplicação Express
const app = express();

// Permite que a API receba dados no formato JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Rotas
app.use("/auth", authRoutes);
app.use("/", instituicoesRoutes);

// Porta onde o servidor ficará disponível
const PORT = 3000;

// Inicia o servidor e começa a escutar requisições
const server = app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

/* ==========================================================================
   TRATAMENTO DE ERROS GLOBAIS E ENCERRAMENTO DA APLICAÇÃO
   ========================================================================== */

/**
 * Captura Promises rejeitadas que não foram tratadas com try/catch ou .catch().
 *
 * Exemplo:
 * await buscarUsuario(); // ocorreu erro e ninguém tratou
 *
 * Como o estado da aplicação pode ficar inconsistente,
 * o servidor é encerrado de forma controlada.
 */
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);

  // Para de aceitar novas requisições.
  // Aguarda as requisições atuais terminarem.
  server.close(async () => {
    // Fecha a conexão com o banco de dados.
    await disconnectDB();

    // Encerra o processo indicando erro.
    process.exit(1);
  });
});

/**
 * Captura erros síncronos que não foram tratados.
 *
 * Exemplo:
 * funcaoQueNaoExiste();
 *
 * Após esse tipo de erro não há garantia de que
 * a aplicação continuará funcionando corretamente.
 */
process.on("uncaughtException", async (err) => {
  console.error("Uncaught Exception:", err);

  // Fecha a conexão com o banco antes de finalizar.
  await disconnectDB();

  // Encerra imediatamente o processo.
  process.exit(1);
});

/**
 * Captura o sinal SIGTERM enviado pelo sistema operacional.
 *
 * Esse sinal normalmente acontece quando:
 * - Docker encerra um container;
 * - Kubernetes reinicia um Pod;
 * - Um serviço de hospedagem reinicia a aplicação.
 *
 * Não é um erro.
 * É apenas um pedido para finalizar a aplicação.
 */
process.on("SIGTERM", async () => {
  console.log("SIGTERM recebido. Encerrando aplicação...");

  // Para de aceitar novas conexões.
  server.close(async () => {
    // Fecha a conexão com o banco.
    await disconnectDB();

    // Finaliza normalmente (sem erro).
    process.exit(0);
  });
});
