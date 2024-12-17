import { NextFunction, Request, Response, Router } from "express";
import { getDataExcel } from "./service/getDataExcel";
import { downloadImages } from "./service/downloadImg";
import { getImageUrls } from "./service/getImgUrl";
export const warehouseRoute = Router();
import { promises as fs } from "fs";
import { rewriteAndUpdatePrices } from "./service/updatePrice";
const readJsonFile = async (filePath: string): Promise<any[]> => {
    try {
        // Read the file content
        const fileContent = await fs.readFile(filePath, "utf-8");
        
        // Parse the JSON data
        const data: any[] = JSON.parse(fileContent);
        
        console.log("Data from JSON file:", data);
        
        // Example: Loop through the array and log each object
        data.forEach((item) => {
            console.log(`ID: ${item.id}, Name: ${item.name}, Age: ${item.age}`);
        });

        return data;
    } catch (error) {
        console.error("Error reading JSON file:", error);
        throw error;
    }
};
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
warehouseRoute.post("/json", async (req, res, next): Promise<void> => {
    try {
        const data = await readJsonFile("C:/code/X1Code/be/output2.json");
        console.log("req.body");
        console.log({data})
        downloadImages(data);
        next();
    } catch (e) {
        // console.error(e);
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
warehouseRoute.put("/updatePrice", async (req, res, next): Promise<void> => {
    try {
        console.log("req.body");
        rewriteAndUpdatePrices("C:/Users/KBT/Downloads/108.xlsx");
        next()
    } catch (e) {
        console.error(e);
        next();
    }
});
