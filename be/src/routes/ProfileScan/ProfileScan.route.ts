import { NextFunction, Request, Response, Router } from "express";
import { fromDataEntity } from "../../libs/dataEntity";
import { scanProfile } from "./service/scanProfile";
import { getListProfileByAccount, getListProfileByPost } from "./service/getListProfile";
import { deleteProfileScan } from "./service/deleteProfile";
import { getProfile } from "../../core-playwright/AccessTradde/getProfile";
import { updateTrashProfile } from "./service/updateProfile";

export const ProfileScanRoute = Router();

// add scan profile from 1 post
ProfileScanRoute.post("/", async (req, res, next): Promise<void> => {
    try {
        console.log(req.body);
        await getProfile(req.body);
        next();
    } catch (e) {
        console.error(e);
        next();
    }
});

//get all profile from 1 post
ProfileScanRoute.get("/", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const listPost = await getListProfileByPost(req.query.postId as string);
        res.json(listPost);
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
});
//get all profile from 1 account
ProfileScanRoute.get("/account", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const listPost = await getListProfileByAccount(req.query.account as string);
        res.json(listPost);
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
});

//delete a trash profile
ProfileScanRoute.delete("/:id", async (req, res, next) => {
    try {
        const result = await deleteProfileScan(req.params.id);
        if (result.status === 200) {
            res.status(200).json({
                status: 200,
                message: "Resource deleted successfully",
            });
        } else if (result.status === 404) {
            res.status(404).json({
                status: 404,
                message: "Resource not found",
            });
        } else {
            res.status(500).json({
                status: 500,
                message: "Internal Server Error",
            });
        }
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
});
//asssign a profile is trash , not delete
ProfileScanRoute.put("/trash", async (req, res, next) => {
    try {
        const result = await updateTrashProfile({ profileId: req.body.profileId, url: req.body.url });
        res.status(200).json(result);
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
});
