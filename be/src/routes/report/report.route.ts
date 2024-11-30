import { NextFunction, Request, Response, Router } from "express";
import { crawlSystem } from "../../core-playwright/crawlSystem/crawlSystem";
import { getDataReport } from "./service/getSold";

export const reportRoute = Router();

//get all account from database
reportRoute.get("/", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const dataResponse = await getDataReport();
        console.log({dataResponse});
        res.json(dataResponse);
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
});