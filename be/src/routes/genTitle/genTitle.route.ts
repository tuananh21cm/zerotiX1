import {  Router } from "express";
import { readFileToArrayAsync } from "../../utils/getKeys";
import { generateTitles } from "../../utils/genTitle";
import { getKeys } from "./services/getKeys";
import { getKeyWordFromFile } from "../keywordTitle/services/getKeyWordFromFile";

export const genTitleRoute = Router();
genTitleRoute.post("/", async (req, res, next): Promise<void> => {
    try {
        const {listKeys,fileName,numberAccount,seller,niche} =req.body;
        console.log({listKeys,fileName,seller,niche});
        const keywords = await getKeyWordFromFile(seller,niche);
        console.log({keywords});
        // const filePath = 'C:/code/web/zeroti-self-api/keys.txt';
        // readFileToArrayAsync(filePath, (phrases) => {
        //   const generatedTitles = generateTitles(listKeys, phrases, 4);
        //   console.log(generatedTitles);  
        // });
        const generatedTitles = generateTitles(listKeys, keywords.key, numberAccount);
        console.log({generatedTitles})
        res.json({ generatedTitles });
        next();
    } catch (e) {
        console.error(e);
        next();
    }
});
