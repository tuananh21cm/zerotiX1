import { chromium } from "playwright";
import { GetDataJson } from "../../routes/TikSuccess/service/getProfileName";
import { getFileNameByOrder } from "../../routes/TikSuccess/service/getFileNameByOrder";
import { addOrIncrementBatchProfiles } from "../../routes/TikSuccess/service/increaseOrder";
import { updateStatus } from "../../routes/TikSuccess/service/updateStatus";
const priorityProfile = [
    "TIKTOKNEW42",
    "TIKTOKNEW239",
    "TIKTOKNEW225",
    "TIKOK140",
    "DP-TIKTOKNEW-103",
    "DP-TIKTOKNEW-136",
    "TIKTOKNEW463",
    "DUYDUC_TIKTOKUS01",
    "TIKTOKNEW556",
    "TIKTOKNEW393",
    "TIKTOKNEW418",
    "TIKTOKNEW439",
    "TIKTOKNEW480",
    "TIKTOKNEW195",
    "TIKTOKNEW521",
    "TIKTOKNEW568",
    "TIKTOKNEW509",
    "TIKTOKNEW473",
    "TIKTOKNEW1113",
    "TIKTOKNEW1114",
    "TIKTOKNEW1115",
    "TIKTOKNEW1116",
    "TIKTOKNEW1117",
    "TIKTOKNEW1118",
    "TIKTOKNEW1119",
    "TIKTOKNEW1120",
    "TIKTOKNEW1125",
    "TIKTOKNEW1126",
    "TIKTOKNEW274",
    "TIKTOKNEW185",
    "TIKTOKNEW167",
]
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
interface IProfile {
    _id: any,
    profileName: string,
    order: number,
    category: string,
    filePath: string
    tag: string
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
        const filePathFull = `${basedPath}/${item.filePath}`;
        const fileName = getFileNameByOrder(filePathFull, item.order);
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
            await tab.click("button span:has-text('Sync Kiki')");
            await tab.waitForLoadState("load");
            await tab.waitForTimeout(8000);
            await tab.click("button span:has-text('Refresh')");
            await tab.waitForLoadState("load");
            await tab.waitForTimeout(8000);
            const checkDied = await tab.$eval("table tbody tr:nth-child(2) td:nth-child(8)", el => el.textContent);
            if(checkDied == "DIED") isDied=true ;
            updateStatus(item,"died")
            return;
        }
        else{
            updateStatus(item,"live")

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
        await tab.setInputFiles(`#images`, `C:/code/X1Code/fe/static/warehouse/${item.filePath}/${fileName}`);
        await tab.waitForTimeout(2000);
        if(item.category == "meme"){
            await tab.fill(`textarea#product_name`, randomMemePhases[Math.floor(Math.random() * randomMemePhases.length)] + " Tee " + fileName.replace(/\.(jpeg|jpg|png)$/i, "").trim() + " " + randomMemePhases[Math.floor(Math.random() * randomMemePhases.length)]);
        }
        if(item.category == "anime"){
            await tab.fill(`textarea#product_name`, "Graphic " + " Tee " + fileName.replace(/\.(jpeg|jpg|png)$/i, "").trim() + " " + " Otaku");
        }
        await tab.click(`tbody tr:nth-child(2) span b:has-text('Save')`);
        await tab.waitForLoadState("load");
        await tab.waitForTimeout(5000);
        await tab.click(".ant-table-measure-row+ .ant-table-row-level-0 .ant-space-item .ant-btn-primary")
        await tab.waitForTimeout(5000);

        //update order ++
        await addOrIncrementBatchProfiles(item);

    });
    await Promise.all(profileTabs);
};