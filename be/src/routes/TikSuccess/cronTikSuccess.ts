import { Router } from "express";
import cron from "node-cron";
import { listingInterval } from "../../core-playwright/TikSuccess/listingInterval";
import { raisedAccount } from "./service/raisedAccount";
export const cronTikSuccess = Router();


cron.schedule("0 */1 * * *", async () => {
    try {
        await raisedAccount();
        console.log("Crawl system cron job executed every minute.");
    } catch (error) {
        console.error("Error executing crawl system cron job:", error);
    }
});