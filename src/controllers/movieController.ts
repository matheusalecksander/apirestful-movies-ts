/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";

import Logger from "../../config/logger";
import { MovieModel } from "../models/Movie";

export async function createMovie(req: Request, res: Response) {
  // Registra o filme no nosso banco de dados
  try {
    const data = req.body;
    const movie = await MovieModel.create(data);
    return res.status(200).json(movie);
  } catch (error: any) {
    Logger.error(`Erro no sistema: ${error.message}`);
  }
}

export async function getMovieById(req: Request, res: Response) {
  // Busca o filme pelo ID em nosso banco de dados
  try {
    const { id } = req.params;
    const movie = await MovieModel.findById(id);

    if (!movie) {
      return res.status(404).json({ error: "Filme não encontrado" });
    }

    return res.status(200).json(movie);
  } catch (error: any) {
    Logger.error(`Erro no sistema: ${error.message}`);
  }
}
