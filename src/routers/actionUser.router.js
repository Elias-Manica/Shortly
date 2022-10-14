import express from "express";

import { hasToken, tokenIsValid } from "../middlewares/auth.middleware.js";
import {
  urlIsValid,
  hasUrltToGet,
} from "../middlewares/actionUser.middleware.js";

import {
  createShortUrl,
  getUrlsById,
} from "../controllers/actionUser.controller.js";

const router = express();

router.post(
  "/urls/shorten",
  hasToken,
  tokenIsValid,
  urlIsValid,
  createShortUrl
);

router.get("/urls/:id", hasUrltToGet, getUrlsById);

export default router;
