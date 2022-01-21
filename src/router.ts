// Arquivo para gerenciamento de rotas
import { Router, Request, Response } from "express";

import Logger from "../config/logger";
import { createMovie } from "./controllers/movieController";

const router = Router();

/*
 * Dentro do nosso router nós iremos criando as rotas utilizando os métodos
 * um em seguida do outro, como um encadeamento de funções
 */

export default router
  .get("/test", (req: Request, res: Response) => {
    res.status(200).send("API Working");
    Logger.info("Teste OK");
  })
  .post("/movie", createMovie);
