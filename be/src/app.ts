import * as bodyParser from "body-parser";
import { serverConfig } from "./server";
import express from 'express';
import http from "http";
import cors from 'cors';
import { ProfileScanRoute } from "./routes/ProfileScan/ProfileScan.route";
import { AccountRoute } from "./routes/Account/Account.route";
import { crawlPostRoute } from "./routes/PostFBCrawl/PostFBCrawl.route";
import { genTitleRoute } from "./routes/genTitle/genTitle.route";
import { genImgRoute } from "./routes/genImg/genImg.route";
import { larkApiRoute } from "./routes/larkApi/larkApi.route";
import { crawlSystemApiRoute } from "./routes/crawlSystemInterval/crawlSystemInterval.route";
import { creatorRoute } from "./routes/creator/creator.route";
import { TikSuccessRoute } from "./routes/TikSuccess/TikSuccess.route";
import { cronTikSuccess } from "./routes/TikSuccess/cronTikSuccess";
import { reportRoute } from "./routes/report/report.route";
import { keywordTitleRoute } from "./routes/keywordTitle/keywordTitle.route";
import { warehouseRoute } from "./routes/warehouse/warehouse.route";
import { profileToolListRoute } from "./routes/profileToolList/profile.route";
export const app = express();
export const server = http.createServer(app);
app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  }));
app.use(bodyParser.json({ limit: serverConfig.payloadLimit }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/crawlPostFb",crawlPostRoute);
app.use("/genTitle",genTitleRoute);
app.use("/genImg",genImgRoute);
app.use("/larkApi",larkApiRoute);
app.use("/crawlSystem",crawlSystemApiRoute);
app.use("/creator",creatorRoute);
app.use("/profileScan",ProfileScanRoute);
app.use("/account",AccountRoute);
app.use("/tikSuccess",TikSuccessRoute);
app.use("/crontikSuccess",cronTikSuccess);
app.use("/report",reportRoute);
app.use("/keywordTitle",keywordTitleRoute);
app.use("/warehouse",warehouseRoute);
app.use("/profileToolList",profileToolListRoute);