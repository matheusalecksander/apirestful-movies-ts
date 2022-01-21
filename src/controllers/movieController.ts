import { Request, Response } from "express";

import { MovieModel } from "../models/Movie";

export async function createMovie(req: Request, res: Response) {
  return res.status(200).send("Controller ok");
}
