import { nanoid } from "nanoid";

import * as usersRepository from "../repositories/usersRepositories.js";

async function createShortUrl(req, res) {
  try {
    const url = req.body.url;
    const userId = res.locals.id;

    let urlShort = nanoid();

    await usersRepository.createShortly(userId, url, urlShort);

    res.status(201).send({ shortUrl: `${urlShort}` });
  } catch (error) {
    res
      .status(500)
      .send({ msg: "Erro no servidor, tente novamente mais tarde" });
  }
}

async function getUrlsById(req, res) {
  const response = res.locals.response;
  try {
    res.status(200).send(response.rows[0]);
  } catch (error) {
    res
      .status(500)
      .send({ msg: "Erro no servidor, tente novamente mais tarde" });
  }
}

async function redirectToShortUrl(req, res) {
  const { shortUrl } = req.params;
  try {
    const response = res.locals.response;
    const url = response.rows[0].url;
    const userId = response.rows[0].userId;

    await usersRepository.updateViewShortly(shortUrl);

    await usersRepository.updateViewUser(userId);

    res.redirect(url);
  } catch (error) {
    res
      .status(500)
      .send({ msg: "Erro no servidor, tente novamente mais tarde" });
  }
}

async function deleteShort(req, res) {
  try {
    const userId = res.locals.response.rows[0].userId;
    const removeViews = res.locals.response.rows[0].visitCountUrl;

    const { id } = req.params;

    await usersRepository.removeViewShortly(removeViews, userId);

    await usersRepository.removeShortly(id);

    res.status(204).send({ msg: "Link deletado com sucesso" });
  } catch (error) {
    res
      .status(500)
      .send({ msg: "Erro no servidor, tente novamente mais tarde" });
  }
}

async function getProfileUser(req, res) {
  try {
    const id = res.locals.id;

    const response = await usersRepository.getProfileWithShortly(id);

    if (response.rows.length === 0) {
      const responseEmpty = await usersRepository.getProfileWithoutShortly(id);

      res.status(200).send(responseEmpty.rows[0]);
      return;
    }

    res.status(200).send(response.rows[0]);
  } catch (error) {
    res
      .status(500)
      .send({ msg: "Erro no servidor, tente novamente mais tarde" });
  }
}

async function getRanking(req, res) {
  try {
    const response = await usersRepository.getRanking();

    res.send(response.rows);
  } catch (error) {
    res
      .status(500)
      .send({ msg: "Erro no servidor, tente novamente mais tarde" });
  }
}

export {
  createShortUrl,
  getUrlsById,
  redirectToShortUrl,
  deleteShort,
  getProfileUser,
  getRanking,
};
