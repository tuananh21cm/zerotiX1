import { NextFunction, Request, Response, Router } from "express";

export const keyFollowShopPlusRoute = Router();


keyFollowShopPlusRoute.post("/crawlKey", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // res.json(listPost);
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
});