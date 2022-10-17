import express from "express";

import {
  bodyIsValid,
  bodySignInIsValid,
  emailIsAvaible,
  hasToken,
  isLogged,
} from "../middlewares/auth.middleware.js";

import { singUp, signIn, signOut } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signUp", bodyIsValid, emailIsAvaible, singUp);

router.post("/signIn", bodySignInIsValid, signIn);

router.post("/signOut", hasToken, isLogged, signOut);

export default router;
