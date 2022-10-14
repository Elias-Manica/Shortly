import express from "express";

import { hasToken, tokenIsValid } from "../middlewares/auth.middleware.js";
import { urlIsValid } from "../middlewares/actionUser.middleware.js";

import { createShortUrl } from "../controllers/actionUser.controller.js";

const router = express();

router.post(
  "/urls/shorten",
  hasToken,
  tokenIsValid,
  urlIsValid,
  createShortUrl
);

export default router;
