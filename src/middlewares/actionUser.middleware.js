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

async function hasUrltToGet(req, res, next) {
  const { id } = req.params;

  try {
    if (!Number(id)) {
      res.status(400).send({ msg: "o id enviado é inválido" });
      return;
    }

    const response = await connection.query(
      `SELECT id, "shortURL", url FROM "linkUsers" WHERE id=$1;`,
      [Number(id)]
    );

    if (response.rows.length === 0) {
      res.status(404).send({ msg: "Essa url não existe" });
      return;
    }

    res.locals.response = response;

    next();
  } catch (error) {
    res
      .status(500)
      .send({ msg: "Erro no servidor, tente novamente mais tarde" });
  }
}

async function hasUrltToRedirect(req, res, next) {
  const { shortUrl } = req.params;
  try {
    const response = await connection.query(
      `SELECT * FROM "linkUsers" WHERE "shortURL"=$1;`,
      [shortUrl]
    );

    if (response.rows.length === 0) {
      res.status(404).send({ msg: "Essa url não existe" });
      return;
    }

    res.locals.response = response;

    next();
  } catch (error) {
    res
      .status(500)
      .send({ msg: "Erro no servidor, tente novamente mais tarde" });
  }
}

export { urlIsValid, hasUrltToGet, hasUrltToRedirect };
