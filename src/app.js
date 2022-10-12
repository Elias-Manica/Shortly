import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import routerAuth from "./routers/auth.router.js";

const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();

app.use(routerAuth);

app.get("/status", (req, res) => {
  res.sendStatus(201);
});

app.listen(process.env.PORT, () => {
  console.log(`Server listen on port ${process.env.PORT}`);
});
