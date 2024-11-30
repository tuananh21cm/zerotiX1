import { NextFunction, Request, Response, Router } from "express";
import { GetDataJson } from "./service/getProfileName";
import { genListing } from "../../core-playwright/TikSuccess/genListing";
export const TikSuccessRoute = Router();

//get all account from database
TikSuccessRoute.get("/", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const account = await GetDataJson();
        res.json(account);
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
});
TikSuccessRoute.get("/interval", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const account = await GetDataJson();
        res.json(account);
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
});
TikSuccessRoute.post("/", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        console.log(req.body);
        const {fileNames,filePaths,profiles}= req.body;
        const account = await genListing(fileNames,filePaths,profiles);
        res.json(account);
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
});