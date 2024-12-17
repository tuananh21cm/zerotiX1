import {  Router } from "express";

export const crawlPostRoute = Router();

// add scan profile from 1 post
crawlPostRoute.get("/", async (req, res, next): Promise<void> => {
    try {

        console.log(req.body);
        
        next();
    } catch (e) {
        console.error(e);
        next();
    }
});