import Joi from "joi";

const signUp = Joi.object({
  name: Joi.string()
    .required()
    .max(200)
    .empty("")
    .regex(/[a-zA-Z0-9]/)
    .messages({
      "string.empty": "O name não pode ser vazio",
      "string.base": "O name deve ser um texto",
      "any.required": "Passar o name é obrigatório",
      "object.regex": "Esse name não deve ser utilizado",
      "string.pattern.base": "O name deve ter pelo menos uma letra",
      "string.max": "O name deve ter no máximo 200 caracteres",
    }),
  email: Joi.string().required().max(100).empty("").email().messages({
    "string.empty": "O email não pode ser vazio",
    "string.base": "O email deve ser um texto",
    "any.required": "Passar o email é obrigatório",
    "string.max": "O email deve ter no máximo 100 caracteres",
    "string.email": "O email deve ser válido",
  }),
  password: Joi.string()
    .required()
    .empty("")
    .regex(/[a-zA-Z0-9]/)
    .messages({
      "string.empty": "A senha não pode ser vazia",
      "string.base": "A senha deve ser um texto",
      "any.required": "Passar a senha é obrigatório",
      "object.regex": "Essa senha não deve ser utilizada",
      "string.pattern.base": "A senha deve ter pelo menos uma letra",
    }),
  confirmPassword: Joi.string()
    .required()
    .empty("")
    .regex(/[a-zA-Z0-9]/)
    .messages({
      "string.empty": "A confimarção de senha não pode ser vazia",
      "string.base": "A confimarção de senha deve ser um texto",
      "any.required": "Passar a confimarção de senha é obrigatório",
      "object.regex": "Essa senha não deve ser utilizada",
      "string.pattern.base":
        "A confimarção de senha deve ter pelo menos uma letra",
    }),
});

const signIn = Joi.object({
  email: Joi.string().required().max(250).empty("").email().messages({
    "string.empty": "O email não pode ser vazio",
    "string.base": "O email deve ser um texto",
    "any.required": "Passar o email é obrigatório",
    "string.max": "O email deve ter no máximo 250 caracteres",
    "string.email": "O email deve ser válido",
  }),
  password: Joi.string()
    .required()
    .empty("")
    .regex(/[a-zA-Z0-9]/)
    .messages({
      "string.empty": "A senha não pode ser vazia",
      "string.base": "A senha deve ser um texto",
      "any.required": "Passar a senha é obrigatório",
      "object.regex": "Essa senha não deve ser utilizada",
      "string.pattern.base": "A senha deve ter pelo menos uma letra",
    }),
});

export { signUp, signIn };
