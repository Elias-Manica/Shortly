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

async function deleteShort(req, res) {
  try {
    const userId = res.locals.response.rows[0].userId;
    const removeViews = res.locals.response.rows[0].visitCountUrl;

    const { id } = req.params;

    await connection.query(
      `UPDATE "usersQuantity" SET "visitCount"="visitCount" - $1 WHERE "userId"=$2;`,
      [removeViews, userId]
    );

    await connection.query(`DELETE FROM "linkUsers" WHERE id=$1`, [id]);

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

    const response = await connection.query(
      `SELECT users.id, users.name, "usersQuantity"."visitCount", json_agg(json_build_object('id', "linkUsers".id, 'shortUrl', "linkUsers"."shortURL", 'url', "linkUsers".url, 'visitCount', "linkUsers"."visitCountUrl")) AS "shortenedUrls" FROM users JOIN "usersQuantity" ON users.id = "usersQuantity"."userId" JOIN "linkUsers" ON users.id = "linkUsers"."userId" WHERE users.id = $1 GROUP BY users.id, "usersQuantity"."visitCount";`,
      [id]
    );

    if (response.rows.length === 0) {
      const responseEmpty = await connection.query(
        `SELECT users.id, users.name, "usersQuantity"."visitCount", '[]'::json AS "shortenedUrls" FROM users JOIN "usersQuantity" ON users.id = "usersQuantity"."userId" WHERE users.id = $1 GROUP BY users.id, "usersQuantity"."visitCount";`,
        [id]
      );

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
    const response = await connection.query(
      `SELECT users.id, users.name, COUNT("linkUsers".id) AS "linksCount", "usersQuantity"."visitCount" FROM users JOIN "usersQuantity" ON users.id = "usersQuantity"."userId" LEFT JOIN "linkUsers" ON users.id = "linkUsers"."userId" GROUP BY users.id, "usersQuantity"."visitCount" ORDER BY "usersQuantity"."visitCount" DESC LIMIT 10;`
    );

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
