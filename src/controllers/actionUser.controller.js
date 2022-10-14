import connection from "../database/database.js";

import { nanoid } from "nanoid";

async function createShortUrl(req, res) {
  try {
    const url = req.body.url;
    const userId = res.locals.id;

    let urlShort = nanoid();

    await connection.query(
      `INSERT INTO "linkUsers" ("userId", url, "shortURL") VALUES ($1, $2, $3);`,
      [userId, url, urlShort]
    );

    const responseCatchUser = await connection.query(
      `SELECT * FROM "usersQuantity" WHERE "userId"=$1;`,
      [userId]
    );

    if (responseCatchUser.rows.length === 0) {
      await connection.query(
        `INSERT INTO "usersQuantity" ("userId", "visitCount") VALUES ($1, $2);`,
        [userId, 0]
      );
      res.status(201).send({ shortUrl: `${urlShort}` });
      return;
    }

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

    await connection.query(
      `UPDATE "linkUsers" SET "visitCountUrl"="visitCountUrl" + 1 WHERE "shortURL"=$1;`,
      [shortUrl]
    );

    await connection.query(
      `UPDATE "usersQuantity" SET "visitCount"="visitCount" + 1 WHERE "userId"=$1;`,
      [userId]
    );

    res.redirect(url);
  } catch (error) {
    res
      .status(500)
      .send({ msg: "Erro no servidor, tente novamente mais tarde" });
  }
}

export { createShortUrl, getUrlsById, redirectToShortUrl };
