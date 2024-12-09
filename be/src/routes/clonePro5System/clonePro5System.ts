import {  Router } from "express";
import { clonePro5 } from "../../core-playwright/clonePro5/clonePro5";
export const clonePro5SystemRoute = Router();

clonePro5SystemRoute.post("/crawl", async (req, res): Promise<void> => {
    try {
       await clonePro5();
    } catch (e) {
        console.error("Error generating Excel files:", e);
        res.status(500).json({ error: "Failed to generate Excel files" });
    }
});