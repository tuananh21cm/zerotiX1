import { Router } from "express";
import { crawlSystem } from "../../core-playwright/crawlSystem/crawlSystem";
import { addNewData } from "./services/addNewData";
import { SystemCrawlDto } from "../../models/dtos/systemCrawlDto";
import cron from "node-cron";
import { crawlSystemYesterday } from "../../core-playwright/crawlSystem/crawlSystemYesterday";
export const    crawlSystemApiRoute = Router();
// cron.schedule("* * * * *", async () => {
//     // Runs every minute
//     try {
//         const dataResponse = await crawlSystem();
//         console.log({ dataResponse });
//         await addNewData(SystemCrawlDto.createObj(dataResponse));
//         console.log("Crawl system cron job executed successfully.");
//     } catch (error) {
//         console.error("Error executing crawl system cron job:", error);
//     }
// });

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
// cron.schedule("0 7 * * *", async () => {
//     try {
//         const dataResponse = await crawlSystemYesterday();
//         console.log({ dataResponse });
//         await addNewData(SystemCrawlDto.createObj(dataResponse));
//         console.log("Crawl system cron job executed successfully.");
//     } catch (error) {
//         console.error("Error executing crawl system cron job:", error);
//     }
// });
cron.schedule("30 13 * * *", async () => {
    try {
        const dataResponse = await crawlSystem();
        console.log({ dataResponse });
        await addNewData(SystemCrawlDto.createObj(dataResponse));
        console.log("Crawl system cron job for 1:30 PM executed successfully.");
    } catch (error) {
        console.error("Error executing crawl system cron job for 1:30 PM:", error);
    }
});
// crawlSystemApiRoute.get("/", async (req, res, next): Promise<void> => {
//     try {
//         const dataResponse = await crawlSystem();
//         await addNewData(SystemCrawlDto.createObj(dataResponse));
//     } catch (e) {
//         console.error(e);
//         next();
//     }
// });
// crawlSystemApiRoute.post("/", async (req, res, next): Promise<void> => {
//     try {
//         const account = await addAccount(req.body);
//         res.status(200).send({account});
//     } catch (e) {
//         console.error(e);
//         next();
//     }
// });
