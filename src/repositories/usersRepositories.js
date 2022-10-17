import connection from "../database/database.js";

async function createShortly(userId, url, urlShort) {
  const response = await connection.query(
    `INSERT INTO "linkUsers" ("userId", url, "shortURL") VALUES ($1, $2, $3);`,
    [userId, url, urlShort]
  );

  return response;
}

async function updateViewShortly(shortUrl) {
  const response = await connection.query(
    `UPDATE "linkUsers" SET "visitCountUrl"="visitCountUrl" + 1 WHERE "shortURL"=$1;`,
    [shortUrl]
  );

  return response;
}

async function updateViewUser(userId) {
  const response = await connection.query(
    `UPDATE "usersQuantity" SET "visitCount"="visitCount" + 1 WHERE "userId"=$1;`,
    [userId]
  );
  return response;
}

async function removeViewShortly(removeViews, userId) {
  const response = await connection.query(
    `UPDATE "usersQuantity" SET "visitCount"="visitCount" - $1 WHERE "userId"=$2;`,
    [removeViews, userId]
  );
  return response;
}

async function removeShortly(id) {
  const response = await connection.query(
    `DELETE FROM "linkUsers" WHERE id=$1`,
    [id]
  );
  return response;
}

async function getProfileWithShortly(id) {
  const response = await connection.query(
    `SELECT users.id, users.name, "usersQuantity"."visitCount", json_agg(json_build_object('id', "linkUsers".id, 'shortUrl', "linkUsers"."shortURL", 'url', "linkUsers".url, 'visitCount', "linkUsers"."visitCountUrl")) AS "shortenedUrls" FROM users JOIN "usersQuantity" ON users.id = "usersQuantity"."userId" JOIN "linkUsers" ON users.id = "linkUsers"."userId" WHERE users.id = $1 GROUP BY users.id, "usersQuantity"."visitCount";`,
    [id]
  );
  return response;
}

async function getProfileWithoutShortly(id) {
  const response = await connection.query(
    `SELECT users.id, users.name, "usersQuantity"."visitCount", '[]'::json AS "shortenedUrls" FROM users JOIN "usersQuantity" ON users.id = "usersQuantity"."userId" WHERE users.id = $1 GROUP BY users.id, "usersQuantity"."visitCount";`,
    [id]
  );
  return response;
}

async function getRanking() {
  const response = await connection.query(
    `SELECT users.id, users.name, COUNT("linkUsers".id) AS "linksCount", "usersQuantity"."visitCount" FROM users JOIN "usersQuantity" ON users.id = "usersQuantity"."userId" LEFT JOIN "linkUsers" ON users.id = "linkUsers"."userId" GROUP BY users.id, "usersQuantity"."visitCount" ORDER BY "usersQuantity"."visitCount" DESC LIMIT 10;`
  );
  return response;
}

async function getUrlById(id) {
  const response = await connection.query(
    `SELECT id, "shortURL", url FROM "linkUsers" WHERE id=$1;`,
    [Number(id)]
  );
  return response;
}

async function getUrlByShortly(shortUrl) {
  const response = await connection.query(
    `SELECT * FROM "linkUsers" WHERE "shortURL"=$1;`,
    [shortUrl]
  );
  return response;
}

async function getUrlByUserId(id) {
  const response = await connection.query(
    `SELECT * FROM "linkUsers" WHERE id=$1;`,
    [Number(id)]
  );
  return response;
}

export {
  createShortly,
  updateViewShortly,
  updateViewUser,
  removeViewShortly,
  removeShortly,
  getProfileWithShortly,
  getProfileWithoutShortly,
  getRanking,
  getUrlById,
  getUrlByShortly,
  getUrlByUserId,
};
