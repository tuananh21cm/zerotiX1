import { NextFunction, Request, Response, Router } from "express";
import { getDataExcel } from "./service/getDataExcel";
import { downloadImages } from "./service/downloadImg";
import { getImageUrls } from "./service/getImgUrl";
export const warehouseRoute = Router();

warehouseRoute.post("/images", async (req, res, next): Promise<void> => {
    try {
        console.log(req.body);
        const listImg = await getImageUrls(req.body.folderPath);
         res.json({data:listImg})
        next();
    } catch (e) {
        console.error(e);
        next();
    }
});

// add scan profile from 1 post
warehouseRoute.post("/", async (req, res, next): Promise<void> => {
    try {
        console.log("req.body");
        const listData = await getDataExcel();
        downloadImages(listData);
        next();
    } catch (e) {
        console.error(e);
        next();
    }
});
