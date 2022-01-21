// ENV Variables
import "dotenv/config";
import config from "config";
import express from "express";

import db from "../config/db";
import Logger from "../config/logger";
import morganMiddleware from "./middlewares/morganMiddleware";
import router from "./router";

// Instanciando o express em uma variável
const app = express();

// Express JSON Middleware
app.use(express.json());

// Morgan middleware
app.use(morganMiddleware);

// Base path config
app.use("/api", router); // Todas as rotas da nossa api irão começar com /api/rota

// Port Config
const port = config.get<number>("port");

// Iniciando servidor express na porta definida no arquivo de config do localhost
app.listen(port, async () => {
  await db();
  Logger.info(`Server is running on: http://localhost:${port}/`);
});
