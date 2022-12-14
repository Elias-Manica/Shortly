import * as usersRepository from "../repositories/usersRepositories.js";

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

    const response = await usersRepository.getUrlById(Number(id));

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
    const response = await usersRepository.getUrlByShortly(shortUrl);

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

async function urlFromThisUser(req, res, next) {
  try {
    const userId = res.locals.id;
    const { id } = req.params;

    if (!Number(id)) {
      res.status(400).send({ msg: "o id enviado é inválido" });
      return;
    }

    const response = await usersRepository.getUrlByUserId(Number(id));

    if (response.rows.length === 0) {
      res.status(404).send({ msg: "Essa url não existe" });
      return;
    }

    const urlUserId = response.rows[0].userId;

    if (userId !== urlUserId) {
      res
        .status(401)
        .send({ msg: "Você não tem permissão para excluir essa url" });
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

export { urlIsValid, hasUrltToGet, hasUrltToRedirect, urlFromThisUser };
