// ENV Variables
import "dotenv/config";
import config from "config";
import express from "express";

import db from "../config/db";
import router from "./router";

// Inicializando o express em uma variável
const app = express();

// Express JSON Middleware
app.use(express.json());

// Port Config
const port = config.get<number>("port");

// Base path config
app.use("/api", router); // Todas as rotas da nossa api irão começar com /api/rota

// Iniciando servidor express na porta 8000 do localhost
app.listen(port, async () => {
  await db();
  console.log(`Server is running on: http://localhost:${port}/`);
});
