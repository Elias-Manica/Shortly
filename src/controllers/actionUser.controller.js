import connection from "../database/database.js";

import { nanoid } from "nanoid";

async function createShortUrl(req, res) {
  try {
    const url = req.body.url;
    const userId = res.locals.id;
    console.log(userId, " userId");
    let urlShort = nanoid();
    console.log(urlShort, " urlSHort");

    await connection.query(
      `INSERT INTO "linkUsers" ("userId", url, "shortURL") VALUES ($1, $2, $3);`,
      [userId, url, urlShort]
    );

    res.status(201).send({ shortUrl: `${urlShort}` });
  } catch (error) {
    res
      .status(500)
      .send({ msg: "Erro no servidor, tente novamente mais tarde" });
  }
}

async function getUrlsById(req, res) {
  const { id } = req.params;
  const response = res.locals.response;
  try {
    console.log(response, " response controller");

    res.status(200).send(response.rows[0]);
  } catch (error) {
    res
      .status(500)
      .send({ msg: "Erro no servidor, tente novamente mais tarde" });
  }
}

export { createShortUrl, getUrlsById };
