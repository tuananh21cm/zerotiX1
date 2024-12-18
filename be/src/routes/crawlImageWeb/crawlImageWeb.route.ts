import { Router } from "express";
import { downloadImagesFromUrls } from "./services/crawlImg";
import { processImagesInDirectory } from "./services/resolutionHandle";
import { sendMessage } from "./services/pushMessage";

export const crawlImageWebRoute = Router();

// add batch profile 
crawlImageWebRoute.post("/crawl", async (req, res, next): Promise<void> => {
    try {
        const urls = req.body.urls;
        const downloadDirectory = req.body.downloadDirectory;
        await downloadImagesFromUrls(urls, downloadDirectory);
        next();
    } catch (e) {
        console.error(e);
        next();
    }
});

crawlImageWebRoute.put("/handleUpscale", async (req, res, next): Promise<void> => {
    try {
        const inputDir = 'C:/crawl/www.thegiftio.uk/upscayl_png_realesrgan-x4plus_2x';
        const outputDir = 'C:/crawl/www.thegiftio.uk/upscayl_png_realesrgan-x4plus_2x/test';
        const maxWidth = 1920;
        const maxHeight = 1080;
        const quality = 99;
        const maxSizeBytes = 5 * 1024 * 1024;
        console.log('Starting batch image processing...');
        await processImagesInDirectory(inputDir, outputDir, maxWidth, maxHeight, quality, maxSizeBytes);
        console.log('Batch image processing completed!');
        next();
    } catch (e) {
        console.error(e);
        next();
    }
});

crawlImageWebRoute.post("/pushMessage", async (req, res, next): Promise<void> => {
    try {
        await sendMessage()
        console.log('Batch image processing completed!');
        next();
    } catch (e) {
        console.error(e);
        next();
    }
})

