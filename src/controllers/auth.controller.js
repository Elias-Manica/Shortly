import connection from "../database/database.js";

import { signUp } from "../schemas/authSchema.js";

async function singUp(req, res) {
  try {
    const response = await connection.query(
      `SELECT * FROM users WHERE email=$1;`,
      [req.body.email]
    );

    if (response.rows.length > 0) {
      res.status(409).send({ msg: "Email já cadastrado" });
      console.log(response);
      return;
    }

    await connection.query(
      `INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`,
      [req.body.name, req.body.email, req.body.password]
    );

    res.status(201).send({ msg: "Conta criada com sucesso" });
  } catch (error) {
    res
      .status(500)
      .send({ msg: "Erro no servidor, tente novamente mais tarde" });
  }
}

export { singUp };
