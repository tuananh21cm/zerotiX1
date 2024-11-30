import {  Router } from "express";
import * as XLSX from "xlsx"; // Import xlsx to handle Excel files
import fs from "fs";
import path from "path";
import { mongoPromise } from "../../db/mongo";
import os from "os";
import { addCreator } from "./service/addCreator";
import { creator } from "../../core-playwright/creator/creator";
import { creatorShopPlus } from "../../core-playwright/shopplus/shopplus";
export const creatorRoute = Router();

creatorRoute.post("/find", async (req, res): Promise<void> => {
    try {
       await creator();
    } catch (e) {
        console.error("Error generating Excel files:", e);
        res.status(500).json({ error: "Failed to generate Excel files" });
    }
});
creatorRoute.post("/findByShopPlus", async (req, res): Promise<void> => {
    try {
       await creatorShopPlus();
    } catch (e) {
        console.error("Error generating Excel files:", e);
        res.status(500).json({ error: "Failed to generate Excel files" });
    }
});

creatorRoute.post("/excelGenerator", async (req, res): Promise<void> => {
    try {
        const { listAccount } = req.body;
        const db = await mongoPromise;

        // Split listAccount into an array of names
        const accountNames = listAccount.split(",");

        // Define the path to the user's "Downloads" folder
        const downloadsFolderPath = path.join(os.homedir(), "Downloads");

        // Ensure the Downloads folder exists
        if (!fs.existsSync(downloadsFolderPath)) {
            fs.mkdirSync(downloadsFolderPath);
        }

        // Array to store generated Excel file paths
        const filePaths: string[] = [];

        // Loop through each name and generate Excel files with unique sets of records
        for (let i = 0; i < accountNames.length; i++) {
            const name = accountNames[i];

            // Fetch 50 records for each name with `isUsed = false`
            const records = await db.creator.find({ isUsed: false }).limit(50).toArray();
            const usernameOnlyData = records.map((record) => ({ username: record.userName }));

            // Add the custom header row text without key-based column headers
            const worksheetData = [
                { username: "Creator username (Don't delete this line. One username per row, up to 100 creators.)" },
                ...usernameOnlyData
            ];

            // Mark these records as used in a single bulkWrite operation
            const bulkUpdates = records.map((record) => ({
                updateOne: {
                    filter: { _id: record._id },
                    update: { $set: { isUsed: true, assignedTo: name } }
                }
            }));
            await db.creator.bulkWrite(bulkUpdates);

            // Convert the worksheet data to a sheet without generating headers from keys
            const worksheet = XLSX.utils.json_to_sheet(worksheetData, { skipHeader: true });
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, name);

            // Define file path within the Downloads folder
            const filePath = path.join(downloadsFolderPath, `${name}-usernames.xlsx`);
            filePaths.push(filePath);

            // Write the Excel file to the Downloads folder
            XLSX.writeFile(workbook, filePath);
        }

        res.json({ message: "Excel files generated successfully", files: filePaths });
    } catch (e) {
        console.error("Error generating Excel files:", e);
        res.status(500).json({ error: "Failed to generate Excel files" });
    }
});
