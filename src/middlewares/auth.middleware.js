import connection from "../database/database.js";

import bcrypt from "bcrypt";

import { signUp, signIn } from "../schemas/authSchema.js";

function bodyIsValid(req, res, next) {
  if (req.body.password !== req.body.confirmPassword) {
    res.status(422).send({ msg: "As senhas são diferentes" });
    return;
  }

  const isValid = signUp.validate(req.body, { abortEarly: false });

  if (isValid.error) {
    const error = isValid.error.details.map((erro) => erro.message);
    res.status(422).send(error);
    return;
  }

  next();
}

async function bodySignInIsValid(req, res, next) {
  const isValid = signIn.validate(req.body, { abortEarly: false });

  if (isValid.error) {
    const error = isValid.error.details.map((erro) => erro.message);
    res.status(422).send(error);
    return;
  }

  const response = await connection.query(
    `SELECT * FROM users WHERE email=$1`,
    [req.body.email]
  );

  if (response.rows.length === 0) {
    res.status(401).send({ msg: "Email ou senha incorretos" });
    return;
  }

  const { password } = req.body;

  if (!bcrypt.compareSync(password, response.rows[0].password)) {
    res.status(401).send({ msg: "Email ou senha incorretos" });
    return;
  }

  res.locals.user = response.rows;

  next();
}

async function hasToken(req, res, next) {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    res.status(401).send({ msg: "Token de acesso não enviado" });
    return;
  }

  next();
}

async function tokenIsValid(req, res, next) {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    const response = await connection.query(
      `SELECT * FROM sessions WHERE token=$1`,
      [token]
    );

    if (response.rows.length === 0) {
      res.status(401).send({ msg: "Token de acesso inválido" });
      return;
    }

    res.locals.id = response.rows[0].userId;

    next();
  } catch (error) {
    res
      .status(500)
      .send({ msg: "Erro no servidor, tente novamente mais tarde" });
  }
}

async function isLogged(req, res, next) {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    const response = await connection.query(
      `SELECT * FROM sessions WHERE token=$1`,
      [token]
    );

    if (response.rows.length === 0) {
      res.status(404).send({ msg: "Usuário já está desconectado" });
      return;
    }

    res.locals.token = response.rows[0].token;

    next();
  } catch (error) {
    res
      .status(500)
      .send({ msg: "Erro no servidor, tente novamente mais tarde" });
  }
}

export { bodyIsValid, bodySignInIsValid, hasToken, tokenIsValid, isLogged };
