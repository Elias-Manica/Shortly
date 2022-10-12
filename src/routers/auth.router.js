import express from "express";

import { bodyIsValid } from "../middlewares/auth.middleware.js";

import { singUp } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signUp", bodyIsValid, singUp);

export default router;
