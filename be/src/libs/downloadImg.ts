import {  chromium, firefox } from "playwright";
import fs from 'fs';
import axios from 'axios';
import path from 'path';
(async () => {
    const browser = await chromium.launch({
        headless: false, // Runs in headless mode
        proxy: {
          server: 'http://38.141.62.243:24518', // Replace with your proxy server address
          username: 'Ducbes12',                 // Optional: Proxy username
          password: 'yj0AFUhnhH'              // Optional: Proxy password
        }
      });
    const browserContext = await browser.newContext();
    const page = await browserContext.newPage();
    await page.waitForTimeout(5000);
    await page.goto("https://freecoursesite.com/",{timeout:0});
    // const imageUrls = await page.$$eval('img', images => 
    //     images.map(img => img.src)
    // );
    // async function downloadImage(url, outputPath) {
    //     const dir = path.dirname(outputPath);
    //     if (!fs.existsSync(dir)) {
    //       fs.mkdirSync(dir, { recursive: true }); 
    //     }
      
    //     if (url.startsWith('data:image/svg+xml')) {
    //       const svgData = url.split(',')[1];
    //       const buffer = Buffer.from(svgData, 'base64');
    //       const outputFilePath = path.resolve(outputPath);
    //       fs.writeFileSync(outputFilePath, buffer);
    //       console.log(`SVG image saved to ${outputFilePath}`);
    //     } else {
    //       const response = await axios({
    //         url,
    //         method: 'GET',
    //         responseType: 'stream',
    //       });
      
    //       const writer = fs.createWriteStream(outputPath);
    //       response.data.pipe(writer);
      
    //       return new Promise((resolve, reject) => {
    //         writer.on('finish', resolve);
    //         writer.on('error', reject);
    //       });
    //     }
    //   }
    // for (const url of imageUrls) {
    //     const cleanUrl = url.split('?')[0];
    //     const filename = path.basename(cleanUrl); 

    //     console.log(`Downloading ${filename}...`);
    //     try {
    //         await downloadImage(url, filename);
    //         console.log(`${filename} downloaded.`);
    //     } catch (error) {
    //         console.error(`Failed to download ${filename}:`, error);
    //     }
    // }

    console.log('All images downloaded.');

    // await browser.close();
})();
