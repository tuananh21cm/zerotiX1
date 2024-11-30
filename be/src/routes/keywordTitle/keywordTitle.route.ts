import { NextFunction, Request, Response, Router } from "express";
import { getProfile } from "../../core-playwright/AccessTradde/getProfile";
import { addKeywordsBatch, addKeyWordTitle } from "./services/keywordTitle";
import { getKeyWord } from "./services/getKeyWord";

export const keywordTitleRoute = Router();


//add batch title
keywordTitleRoute.post("/batch", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const listPost = await addKeywordsBatch(req.body.data);
        // res.json(listPost);
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
});
//get title
keywordTitleRoute.get("/", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const lisTitle = await getKeyWord(req.query.category as string);
        // console.log({lisTitle})
        res.json(lisTitle);
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
});

//add new title
keywordTitleRoute.post("/", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const listPost = await addKeyWordTitle(req.body.keyword);
        console.log(req.body.keyword)
        // res.json(listPost);
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
});