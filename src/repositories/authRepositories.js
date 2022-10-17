import connection from "../database/database.js";

async function createUser(name, email, password) {
  const response = await connection.query(
    `INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`,
    [name, email, password]
  );
  return response;
}

async function searchUser(email) {
  const response = await connection.query(
    `SELECT * FROM users WHERE email=$1`,
    [email]
  );
  return response;
}

async function createTableUserQuantity(idUser, quantity) {
  const response = await connection.query(
    `INSERT INTO "usersQuantity" ("userId", "visitCount") VALUES ($1, $2);`,
    [idUser, quantity]
  );

  return response;
}

async function searchUserById(id) {
  const response = await connection.query(
    `SELECT * FROM sessions WHERE "userId"=$1`,
    [id]
  );

  return response;
}

async function createSession(id, token) {
  const response = await connection.query(
    `INSERT INTO sessions ("userId", "token") VALUES ($1, $2)`,
    [id, token]
  );

  return response;
}

async function searchSessionByToken(token) {
  const response = await connection.query(
    `SELECT * FROM sessions WHERE token=$1`,
    [token]
  );
  return response;
}
async function deleteSession(id) {
  const response = await connection.query(
    `DELETE FROM sessions WHERE "userId"=$1`,
    [id]
  );
  return response;
}

async function deleteSessionByToken(token) {
  const response = await connection.query(
    `DELETE FROM sessions WHERE token=$1`,
    [token]
  );
  return response;
}

export {
  createUser,
  searchUser,
  createTableUserQuantity,
  searchUserById,
  createSession,
  searchSessionByToken,
  deleteSession,
  deleteSessionByToken,
};
