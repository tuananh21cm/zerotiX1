import { NextFunction, Request, Response, Router } from "express";
import { addKeywordsBatch, addKeyWordTitle } from "./services/keywordTitle";
import { getKeyWord } from "./services/getKeyWord";
import { getKeyWordFromFile } from "./services/getKeyWordFromFile";

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
//get title by File
keywordTitleRoute.get("/file", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const filePath:string= "//172.16.0.30/kbt_global/KBT_Teamx1/Images/tikSuccess/tuananh/keys.txt"
        const lisTitle = await getKeyWordFromFile(filePath);
        console.log({lisTitle})
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