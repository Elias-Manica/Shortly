import express from "express";

import { hasToken, tokenIsValid } from "../middlewares/auth.middleware.js";
import {
  urlIsValid,
  hasUrltToGet,
  hasUrltToRedirect,
  urlFromThisUser,
} from "../middlewares/actionUser.middleware.js";

import {
  createShortUrl,
  getUrlsById,
  redirectToShortUrl,
  deleteShort,
  getProfileUser,
  getRanking,
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

router.delete(
  "/urls/:id",
  hasToken,
  tokenIsValid,
  urlFromThisUser,
  deleteShort
);

router.get("/users/me", hasToken, tokenIsValid, getProfileUser);

router.get("/ranking", getRanking);

export default router;
