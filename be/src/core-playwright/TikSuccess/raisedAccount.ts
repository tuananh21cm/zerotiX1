import { chromium } from "playwright";
import { GetDataJson } from "../../routes/TikSuccess/service/getProfileName";
import { getFileNameByOrder } from "../../routes/TikSuccess/service/getFileNameByOrder";
import { addOrIncrementBatchProfiles } from "../../routes/TikSuccess/service/increaseOrder";
import { updateStatus } from "../../routes/TikSuccess/service/updateStatus";
import { generateSingleTitle } from "../../utils/genSingleTitle";
import { getKeyWord } from "../../routes/keywordTitle/services/getKeyWord";
import { getKeyWordFromFile } from "../../routes/keywordTitle/services/getKeyWordFromFile";

const randomMemePhases = [
    "Silly ",
    "Humor ",
    "Foolish ",
    "Goofy ",
    "Ridiculous ",
    "Absurd ",
    "Clumsy ",
    "Daft ",
    "Dumb ",
    "Nonsensical ",
    "Wacky ",
    "Zany ",
    "Childish ",
    "Frivolous ",
    "Preposterous ",
    "Impractical ",
    "Idiotic "
]
import fs from 'fs/promises';
import 'dotenv/config'
const seller = process.env.seller;
interface IProfile {
    _id: any,
    profileName: string,
    order: number,
    category: string,
    folderPath: string
    tag: string,
    status:string
}
const basedPath = 'C:/code/X1Code/fe/static/warehouse'
export const raisedAccountCore = async function (profiles: IProfile[]): Promise<void> {
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
    const profileTabs = profiles.map(async (item: IProfile, index: number) => {
        const filePathFull = `${basedPath}/${item.folderPath}`;
        const fileName = getFileNameByOrder(filePathFull, item.order);
        console.log({fileName})
        const tab = await browserContext.newPage();
        await tab.goto(`https://apps.tiksuccess.com/ket-noi-shop-tiktok`);
        await tab.waitForLoadState("load");
        await tab.waitForTimeout(5000);
        await tab.fill("input[placeholder='Tìm kiếm theo: Tên cửa hàng, Profile']", item.profileName);
        await tab.waitForTimeout(2000);
        await tab.keyboard.press("Enter");
        await tab.waitForLoadState("load");
        await tab.waitForTimeout(7000);
        let isDied: boolean = false;
        const checkDied = await tab.$eval("table tbody tr:nth-child(2) td:nth-child(8)", el => el.textContent);
        if (checkDied == "DIED") {
            console.log("died");
            await tab.click("button span:has-text('Sync Kiki')");
            await tab.waitForLoadState("load");
            await tab.waitForTimeout(8000);
            await tab.click("button span:has-text('Refresh')");
            await tab.waitForLoadState("load");
            await tab.waitForTimeout(8000);
            const checkDied = await tab.$eval("table tbody tr:nth-child(2) td:nth-child(8)", el => el.textContent);
            if(checkDied == "DIED") isDied=true ;
            updateStatus(item,"died");
            return;
        }
        else{
            updateStatus(item,"live");
        }
        await tab.goto(`https://apps.tiksuccess.com/quan-ly-listing`);
        await tab.waitForLoadState("load");
        await tab.waitForTimeout(5000);
        await tab.fill("input#shop_id", item.profileName);
        await tab.keyboard.press("Enter");
        await tab.waitForLoadState("load");
        await tab.waitForTimeout(5000);
        await tab.click("span:has-text('Tạo mới Listing')");
        await tab.waitForLoadState("load");
        await tab.waitForTimeout(2000);
        await tab.fill("input#CreateListing_number_sku", "1");
        await tab.click("input#CreateListing_product_id");
        await tab.keyboard.press("Enter");
        await tab.waitForLoadState("load");
        await tab.waitForTimeout(2000);
        await tab.fill("input#CreateListing_quantity", "10");
        await tab.click("span:has-text('Tạo Listing')");
        await tab.waitForLoadState("load");
        await tab.waitForTimeout(10000);
        await tab.click(`tbody tr:nth-child(2) span[title='Edit Listing']`);
        await tab.waitForTimeout(2000);
        await tab.setInputFiles(`#images`, `C:/code/X1Code/fe/static/warehouse/${item.folderPath}/${fileName}`);
        await tab.waitForTimeout(2000);
            const keywords :any= await getKeyWordFromFile(seller,item.category);
            console.log({keywords})
            const title = await generateSingleTitle(fileName.replace(/\.(jpeg|jpg|png)$/i, "").trim(),keywords);
            await tab.fill(`textarea#product_name`, title);
        
        await tab.click(`tbody tr:nth-child(2) span b:has-text('Save')`);
        await tab.waitForLoadState("load");
        await tab.waitForTimeout(5000);
        await tab.click(".ant-table-measure-row+ .ant-table-row-level-0 .ant-space-item .ant-btn-primary")
        await tab.waitForTimeout(5000);
        await tab.close();
        //update order ++
        await addOrIncrementBatchProfiles(item);

    });
    await Promise.all(profileTabs);
    await browser.close();
};