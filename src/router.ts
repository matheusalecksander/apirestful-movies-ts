// Arquivo para gerenciamento de rotas
import { Router, Request, Response } from "express";

import Logger from "../config/logger";
import {
  createMovie,
  deleteMovieById,
  getAllMovies,
  getMovieById,
  updateMovieById,
} from "./controllers/movieController";
import { validate } from "./middlewares/handleValidation";
import { movieCreateAndUpdateValidation } from "./middlewares/movieValidator";

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
  .post("/movie", movieCreateAndUpdateValidation(), validate, createMovie)
  .get("/movie/:id", getMovieById)
  .get("/movie", getAllMovies)
  .delete("/movie/:id", deleteMovieById)
  .patch(
    "/movie/:id",
    movieCreateAndUpdateValidation(),
    validate,
    updateMovieById
  );

/*
 * Inserimos nosso middleware de validação diretamente nas nossas requisições
 * Não utilizamos ele no app.use() porquê não são todas as rotas que irão
 * precisar dessa validação, estaríamos adicionando lógica desnecessária
 * nessas rotas
 */
