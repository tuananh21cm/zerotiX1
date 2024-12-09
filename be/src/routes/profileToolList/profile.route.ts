import { Router } from "express";
import { addProfile } from "./services/addProfile";
import { addBatchProfiles } from "./services/addBatchProfile";
import { getListProfileByCategory } from "./services/getProfile";

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
// add profile 
profileToolListRoute.get("/", async (req, res, next): Promise<void> => {
    try {
        const data = await getListProfileByCategory(req.query?.category as string)
        console.log({data})
        res.json(data);
        next();
    } catch (e) {
        console.error(e);
        next();
    }
});
