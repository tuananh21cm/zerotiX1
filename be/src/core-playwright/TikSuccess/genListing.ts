import { chromium } from "playwright-core";
import { generateSingleTitle } from "../../utils/genSingleTitle";
import fs from 'fs';
export function readFile(filePath: string): Promise<string[]> {
    return fs.promises.readFile(filePath, 'utf-8')
      .then(data => data.split('\n'))  // Split the file data into an array by newlines
      .catch(err => {
        console.error("Error reading the file:", err);
        return [];  // Return an empty array in case of an error
      });
  }
  function chunkArray(array:string[], chunkSize:number) {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        result.push(array.slice(i, i + chunkSize));
    }
    return result;
}
export const genListing = async function (fileNames: string[], filePaths: string[], profiles: string[]): Promise<void> {
    try {
        console.log(fileNames)
        console.log(filePaths)
        console.log(profiles)
        console.log("start gen")
        const bChunks = chunkArray(fileNames, filePaths.length);
        console.log(bChunks)
        const chunk = (fileNames.length)/(profiles.length);
        const browser = await chromium.launch({
            headless: false,
        });
        const browserContext = await browser.newContext();
        const page = await browserContext.newPage();
        await page.goto("https://apps.tiksuccess.com/login");
        await page.waitForLoadState("load");
        await page.waitForTimeout(3000);
        await page.fill("input[name='username']", "ducbes98@gmail.com");
        await page.fill("input[name='password']", "Ducbes1202@");
        await page.waitForTimeout(2000);
        await page.click('button[type="submit"]');
        await page.waitForLoadState("load");
        await page.waitForTimeout(2000);
        const profileTabs = profiles.map(async (item: string,index:number) => {
            const tab = await browserContext.newPage();
            await tab.goto(`https://apps.tiksuccess.com/quan-ly-listing`);
            await tab.waitForLoadState("load");
            await tab.waitForTimeout(5000);
            await tab.fill("input#shop_id", item);
            await tab.keyboard.press("Enter");
            await tab.waitForLoadState("load");
            await tab.waitForTimeout(5000);
            await tab.click("span:has-text('Tạo mới Listing')");
            await tab.waitForLoadState("load");
            await tab.waitForTimeout(2000);
            await tab.fill("input#CreateListing_number_sku", chunk + "");
            await tab.click("input#CreateListing_product_id");
            await tab.keyboard.press("Enter");
            await tab.waitForLoadState("load");
            await tab.waitForTimeout(2000);
            await tab.fill("input#CreateListing_quantity", "10");
            await tab.click("span:has-text('Tạo Listing')");
            await tab.waitForLoadState("load");
            await tab.waitForTimeout(4000);
            for (let i = 0; i < fileNames.length; i++) {
                const fileName = fileNames[i];
                if(fileName == "Thumbs") continue;
                if(filePaths[i] === undefined) continue;
                await tab.click(`tbody tr:nth-child(${i + 2}) span[title='Edit Listing']`);
                await tab.setInputFiles(`tbody tr:nth-child(${i + 2}) .ant-upload-list.ant-upload-list-picture-circle input`, `//172.16.0.30/kbt_global/KBT_Teamx1/Images/tikSuccess/tuananh/${filePaths[i]}`);
                await tab.fill(`tbody tr:nth-child(${i + 2}) textarea#product_name`, bChunks[index][i]);
                await tab.click(`tbody tr:nth-child(${i + 2}) span b:has-text('Save')`);
                await tab.waitForLoadState("load");
                await tab.waitForTimeout(5000);
            }
            
            
        });
        await Promise.all(profileTabs);
    } catch (error) {
        console.error("An error occurred:", error);
    } finally {
        // await browser.close();
    }
};
