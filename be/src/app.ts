import * as bodyParser from "body-parser";
import { serverConfig } from "./server";
import express from 'express';
import http from "http";
import cors from 'cors';
import { genTitleRoute } from "./routes/genTitle/genTitle.route";
import { TikSuccessRoute } from "./routes/TikSuccess/TikSuccess.route";
import { cronTikSuccess } from "./routes/TikSuccess/cronTikSuccess";
import { keywordTitleRoute } from "./routes/keywordTitle/keywordTitle.route";
export const app = express();
export const server = http.createServer(app);
app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  }));
app.use(bodyParser.json({ limit: serverConfig.payloadLimit }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/genTitle",genTitleRoute);
app.use("/tikSuccess",TikSuccessRoute);
app.use("/crontikSuccess",cronTikSuccess);
app.use("/keywordTitle",keywordTitleRoute);