import express from "express";

import { hasToken, tokenIsValid } from "../middlewares/auth.middleware.js";
import {
  urlIsValid,
  hasUrltToGet,
  hasUrltToRedirect,
} from "../middlewares/actionUser.middleware.js";

import {
  createShortUrl,
  getUrlsById,
  redirectToShortUrl,
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

router.get("/urls/open/:shortUrl", hasUrltToRedirect, redirectToShortUrl);

export default router;
