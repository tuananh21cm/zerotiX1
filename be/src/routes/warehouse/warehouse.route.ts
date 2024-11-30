import { NextFunction, Request, Response, Router } from "express";
import { getDataExcel } from "./service/getDataExcel";
import { downloadImages } from "./service/downloadImg";
export const warehouseRoute = Router();

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
