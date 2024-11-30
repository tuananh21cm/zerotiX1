import {  Router } from "express";
import genImg from "../../libs/generateImg";

export const genImgRoute = Router();
genImgRoute.post("/", async (req, res, next): Promise<void> => {
    try {
        console.log("gen img");
        await genImg();
        next();
    } catch (e) {
        console.error(e);
        next();
    }
});
