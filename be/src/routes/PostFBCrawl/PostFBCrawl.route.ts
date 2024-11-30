import {  Router } from "express";
import { crawwlPost } from "../../core-playwright/CrawlFb/crawlFb";
import { addGroup } from "./service/addGroup";

export const crawlPostRoute = Router();

// add scan profile from 1 post
crawlPostRoute.get("/", async (req, res, next): Promise<void> => {
    try {

        console.log(req.body);
        const {listPost} =req.body;
        await crawwlPost(listPost);
        next();
    } catch (e) {
        console.error(e);
        next();
    }
});
// add scan profile from 1 post
crawlPostRoute.post("/", async (req, res, next): Promise<void> => {
    try {
        await addGroup(req.body);
        console.log(req.body);
        next();
    } catch (e) {
        console.error(e);
        next();
    }
});
