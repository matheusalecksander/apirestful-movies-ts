import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

// Função para validar nossas requisições
export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req); // Recuperando os possíveis erros

  // Se não tivermos erros, siga em frente
  if (errors.isEmpty()) {
    return next();
  }

  // Constante para armazenar os erros
  const extractedErrors: object[] = [];

  // Percorre o array de erros e os insere na nossa constante como um objeto
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  // Retorna um json com os erros
  return res.status(422).json({
    errors: extractedErrors,
  });
};
