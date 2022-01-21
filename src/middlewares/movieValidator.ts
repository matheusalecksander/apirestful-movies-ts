import { body } from "express-validator";

export const movieCreateAndUpdateValidation = () => {
  return [
    body("title")
      // Valida se o título é uma string, com no mínimo 5 caracteres.
      .isString()
      .withMessage("O título é obrigatório!")
      .isLength({ min: 5 })
      .withMessage("O título precisa ter no mínimo 5 caracteres"),
    body("rating")
      // Valida se a classificação é um número entre 0 e 10.
      .isNumeric()
      .withMessage("A nota precisa ser um número")
      .custom((value: number) => {
        if (value < 0 || value > 10) {
          throw new Error("Insira uma nota entre 0 e 10");
        }

        return true;
      }),
    body("description")
      // Valida se a descrição é uma string, com no mínimo 15 caracteres.
      .isString()
      .withMessage("A descrição é obrigatória")
      .isLength({ min: 15 })
      .withMessage("A descrição precisa ter no mínimo 15 caracteres"),
    body("director")
      // Valida se o nome do diretor é uma string.
      .isString()
      .withMessage("O nome do diretor precisa ser obrigatório"),
    body("poster")
      // Valida se o poster do filme é uma URL.
      .isString()
      .withMessage("O poster precisa ser uma URL"),
  ];
};
