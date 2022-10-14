import connection from "../database/database.js";

import { createShortUrl } from "../schemas/urlPostSchema.js";

async function urlIsValid(req, res, next) {
  const isValid = createShortUrl.validate(req.body, { abortEarly: false });

  if (isValid.error) {
    const error = isValid.error.details.map((erro) => erro.message);
    res.status(422).send(error);
    return;
  }
  next();
}

export { urlIsValid };
