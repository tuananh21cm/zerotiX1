import { Router } from "express";
import { addProfile } from "./services/addProfile";
import { addBatchProfiles } from "./services/addBatchProfile";

export const profileToolListRoute = Router();

// add batch profile 
profileToolListRoute.post("/batch", async (req, res, next): Promise<void> => {
    try {
        console.log(req.body);
        addBatchProfiles(req.body.data)
        next();
    } catch (e) {
        console.error(e);
        next();
    }
});

// add profile 
profileToolListRoute.post("/", async (req, res, next): Promise<void> => {
    try {
        console.log(req.body);
        addProfile(req.body.data)
        next();
    } catch (e) {
        console.error(e);
        next();
    }
});
