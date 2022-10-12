import { signUp } from "../schemas/authSchema.js";

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

export { bodyIsValid };
