import bcrypt from "bcrypt";

import { v4 as uuid } from "uuid";

import * as authRepositorie from "../repositories/authRepositories.js";

async function singUp(req, res) {
  try {
    const passwordEncrypted = bcrypt.hashSync(req.body.password, 10);

    await authRepositorie.createUser(
      req.body.name,
      req.body.email,
      passwordEncrypted
    );

    const responseGetUser = await authRepositorie.searchUser(req.body.email);

    await authRepositorie.createTableUserQuantity(
      responseGetUser.rows[0].id,
      0
    );

    res.status(201).send({ msg: "Conta criada com sucesso" });
  } catch (error) {
    res
      .status(500)
      .send({ msg: "Erro no servidor, tente novamente mais tarde" });
  }
}

async function signIn(req, res) {
  try {
    const user = res.locals.user;
    const token = uuid();

    const response = await authRepositorie.searchUserById(user[0].id);

    if (response.rows.length === 0) {
      await authRepositorie.createSession(user[0].id, token);

      res.status(201).send({ token: `${token}` });
      return;
    }

    await authRepositorie.deleteSession(user[0].id);

    await authRepositorie.createSession(user[0].id, token);

    res.status(201).send({ token: `${token}` });
  } catch (error) {
    res
      .status(500)
      .send({ msg: "Erro no servidor, tente novamente mais tarde" });
  }
}

async function signOut(req, res) {
  try {
    const token = res.locals.token;

    await authRepositorie.deleteSessionByToken(token);
    res.status(200).send({ msg: "O usuário foi deslogado" });
  } catch (error) {
    res
      .status(500)
      .send({ msg: "Erro no servidor, tente novamente mais tarde" });
  }
}

export { singUp, signIn, signOut };
