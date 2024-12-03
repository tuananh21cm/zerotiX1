import { Router } from "express";
import cron from "node-cron";
import { listingInterval } from "../../core-playwright/TikSuccess/listingInterval";
import { raisedAccount } from "./service/raisedAccount";
export const cronTikSuccess = Router();

// cron.schedule("0 */2 * * *", async () => {
//     try {
//         await listingInterval([],[],[]);
//         console.log("Crawl system cron job executed every minute.");
//     } catch (error) {
//         console.error("Error executing crawl system cron job:", error);
//     }
// });
cron.schedule("*/10 * * * *", async () => {
    try {
        await raisedAccount();
        console.log("Crawl system cron job executed every minute.");
    } catch (error) {
        console.error("Error executing crawl system cron job:", error);
    }
});
// cron.schedule("* * * * *", async () => {
//     try {
//         await raisedAccount();
//         console.log("Crawl system cron job executed every minute.");
//     } catch (error) {
//         console.error("Error executing crawl system cron job:", error);
//     }
// });