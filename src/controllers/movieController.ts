/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";

import Logger from "../../config/logger";
import { MovieModel } from "../models/Movie";

export async function createMovie(req: Request, res: Response) {
  try {
    const data = req.body;
    const movie = await MovieModel.create(data);
    return res.status(200).json(movie);
  } catch (error: any) {
    Logger.error(`Erro no sistema: ${error.message}`);
  }
}
