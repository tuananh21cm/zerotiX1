import { Router } from "express";
import cron from "node-cron";
import { listingInterval } from "../../core-playwright/TikSuccess/listingInterval";
export const cronTikSuccess = Router();

cron.schedule("0 */2 * * *", async () => {
    try {
        await listingInterval([],[],[]);
        console.log("Crawl system cron job executed every minute.");
    } catch (error) {
        console.error("Error executing crawl system cron job:", error);
    }
});