import Joi from "joi";

const createShortUrl = Joi.object({
  url: Joi.string()
    .required()
    .empty("")
    .regex(
      /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(:[0-9]+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
    )
    .messages({
      "any.required": "Passar a url é obrigatório",
      "string.empty": "A url não pode ser vazia",
      "string.base": "A url deve ser um texto",
      "object.regex": "Isso não tem o formato de uma url",
      "string.pattern.base": "Isso não tem o formato de uma url",
    }),
});

export { createShortUrl };
