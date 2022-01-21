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
    return res.status(500).json({ msg: "Tente novamente mais tarde" });
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
    return res.status(500).json({ msg: "Tente novamente mais tarde" });
  }
}

export async function getAllMovies(req: Request, res: Response) {
  // Busca todos os nosso filmes
  try {
    const movies = await MovieModel.find();

    if (!movies) {
      return res
        .status(404)
        .json({ error: "Nenhum filme cadastrado até o momento" });
    }

    return res.status(200).json(movies);
  } catch (error: any) {
    Logger.error(`Erro no sistema: ${error.message}`);
    return res.status(500).json({ msg: "Tente novamente mais tarde" });
  }
}

export async function deleteMovieById(req: Request, res: Response) {
  // Deleta o filme pelo ID em nosso banco de dados
  try {
    const { id } = req.params;
    const movie = await MovieModel.findById(id);

    if (!movie) {
      return res.status(404).json({ error: "Filme não encontrado" });
    }

    await movie.delete();

    return res.status(200).json({ msg: "Filme removido com sucesso" });
  } catch (error: any) {
    Logger.error(`Erro no sistema: ${error.message}`);
    return res.status(500).json({ msg: "Tente novamente mais tarde" });
  }
}

export async function updateMovieById(req: Request, res: Response) {
  // Atualiza os dados do filme pelo ID em nosso banco de dados
  try {
    const { id } = req.params;
    const data = req.body;
    const movie = await MovieModel.findById(id);

    if (!movie) {
      return res.status(404).json({ error: "Filme não encontrado" });
    }

    await MovieModel.updateOne({ _id: id }, data);

    return res.status(200).json({ msg: "Filme atualizado com sucesso", data });
  } catch (error: any) {
    Logger.error(`Erro no sistema: ${error.message}`);
    return res.status(500).json({ msg: "Tente novamente mais tarde" });
  }
}
