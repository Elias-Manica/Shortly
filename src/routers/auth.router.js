import express from "express";

import {
  bodyIsValid,
  bodySignInIsValid,
} from "../middlewares/auth.middleware.js";

import { singUp, signIn } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signUp", bodyIsValid, singUp);

router.post("/signIn", bodySignInIsValid, signIn);

export default router;
