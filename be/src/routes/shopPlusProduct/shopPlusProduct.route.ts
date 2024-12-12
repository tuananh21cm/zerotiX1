import { NextFunction, Request, Response, Router } from "express";
import { keyFollowShopPlusCore } from "../../core-playwright/shopplus/keyFollowShopPlusCore";
import { addKeyWordShopPlus } from "./services/addKeyword";
import { getListKeyWordsAnalytics } from "./services/getListKey";
import { getDataKey } from "./services/getDataKeyword";
export const shopPlusProductRoute = Router();

shopPlusProductRoute.get("/list", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try { 
        const listKey = await getListKeyWordsAnalytics();
        res.json(listKey);
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
});
shopPlusProductRoute.get("/data", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try { 
        const listKey = await getDataKey();
        res.json(listKey);
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
});

shopPlusProductRoute.get("/crawl", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try { 
        const listKeys = await getListKeyWordsAnalytics() as string[];
        await keyFollowShopPlusCore(listKeys);
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
});
shopPlusProductRoute.post("/", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try { 
        console.log("po")
        await addKeyWordShopPlus(req.query);
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
});