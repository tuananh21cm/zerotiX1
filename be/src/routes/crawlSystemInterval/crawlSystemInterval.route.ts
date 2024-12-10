import { Router } from "express";
import { crawlSystem } from "../../core-playwright/crawlSystem/crawlSystem";
import { addNewData, DAYTYPE } from "./services/addNewData";
import { SystemCrawlDto } from "../../models/dtos/systemCrawlDto";
import cron from "node-cron";
import { crawlSystemYesterday } from "../../core-playwright/crawlSystem/crawlSystemYesterday";
export const    crawlSystemApiRoute = Router();

crawlSystemApiRoute.post("/crawlNewData", async (req, res, next): Promise<void> => {
    try {
        const dataResponse = await crawlSystem();
        console.log({ dataResponse });
        await addNewData(SystemCrawlDto.createObj(dataResponse),DAYTYPE.TODAY);
    } catch (e) {
        console.error(e);
        next();
    }
});
crawlSystemApiRoute.post("/crawlDataYesterday", async (req, res, next): Promise<void> => {
    try {
        const dataResponse = await crawlSystemYesterday();
        console.log({ dataResponse });
        await addNewData(SystemCrawlDto.createObj(dataResponse),DAYTYPE.YESTERDAY);
    } catch (e) {
        console.error(e);
        next();
    }
});
crawlSystemApiRoute.get("/test", async (req, res, next): Promise<void> => {
    try {
      const data =await crawlSystem();
      console.log("data :",data);
    } catch (e) {
        console.error(e);
        next();
    }
});

// cron.schedule("0 */2 * * *", async () => {
//     // "0 * * * *" runs at the start of every hour
//     try {
//         const dataResponse = await crawlSystem();
//         console.log({ dataResponse });
//         await addNewData(SystemCrawlDto.createObj(dataResponse));
//         console.log("Crawl system cron job executed successfully.");
//     } catch (error) {
//         console.error("Error executing crawl system cron job:", error);
//     }
// });
cron.schedule("0 6,8,16,20 * * *", async () => {
    try {
        const dataResponse = await crawlSystem();
        console.log({ dataResponse });
        await addNewData(SystemCrawlDto.createObj(dataResponse),DAYTYPE.TODAY);
        console.log("Crawl system cron job executed successfully.");
    } catch (error) {
        console.error("Error executing crawl system cron job:", error);
    }
});

cron.schedule("58 11 * * *", async () => {
    try {
        const dataResponse = await crawlSystem();
        console.log({ dataResponse });
        await addNewData(SystemCrawlDto.createObj(dataResponse),DAYTYPE.TODAY);
        console.log("Crawl system cron job executed successfully.");
    } catch (error) {
        console.error("Error executing crawl system cron job:", error);
    }
});

cron.schedule("30 23 * * *", async () => {
    try {
        const dataResponse = await crawlSystem();
        console.log({ dataResponse });
        await addNewData(SystemCrawlDto.createObj(dataResponse),DAYTYPE.TODAY);
        console.log("Crawl system cron job executed successfully.");
    } catch (error) {
        console.error("Error executing crawl system cron job:", error);
    }
});
cron.schedule("30 13 * * *", async () => {
    try {
        const dataResponse = await crawlSystem();
        console.log({ dataResponse });
        await addNewData(SystemCrawlDto.createObj(dataResponse),DAYTYPE.TODAY);
        console.log("Crawl system cron job for 1:30 PM executed successfully.");
    } catch (error) {
        console.error("Error executing crawl system cron job for 1:30 PM:", error);
    }
});
cron.schedule("0 5 * * *", async () => {
    try {
        const dataResponse = await crawlSystemYesterday();
        console.log({ dataResponse });
        await addNewData(SystemCrawlDto.createObj(dataResponse),DAYTYPE.YESTERDAY);
        console.log("Crawl system cron job executed successfully.");
    } catch (error) {
        console.error("Error executing crawl system cron job:", error);
    }
});