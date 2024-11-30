import { chromium } from "playwright";
import { GetDataJson } from "../../routes/TikSuccess/service/getProfileName";
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
export const listingInterval = async function (fileNames: string[], filePaths: string[], profiles: string[]): Promise<void> {
    try {
        console.log(fileNames, filePaths, profiles);
        const browser = await chromium.launch({
            headless: true,
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
        const data = await GetDataJson();
        const listProfile = data.data.map((item: any) => item.profile);
        const chunk = 10;
        const start = 0;
        const end = 10;
        for (const item of priorityProfile) {
            const tab = await browserContext.newPage();
            await tab.goto(`https://apps.tiksuccess.com/quan-ly-listing`);
            await tab.waitForLoadState("load");
            await tab.waitForTimeout(5000);
            await tab.fill("input#shop_id", item);
            await tab.keyboard.press("Enter");
            await tab.waitForLoadState("load");
            await tab.waitForTimeout(2000);
            const noDataElement = await tab.$('.ant-empty-description');
            if (noDataElement) {
                const textContent = await noDataElement.textContent();
                if (textContent.includes("No data")) {
                    console.log("Skipping loop due to 'No data' message.");
                    await tab.close();

                    continue;
                }
            }
            await tab.click('tbody tr:nth-child(2) td:last-child span:has-text("Đăng sản phẩm")');
            await tab.waitForTimeout(2000);
            await tab.close();
        }
        // const profileTabs = priorityProfile.map(async (item: string) => {
        //     const tab = await browserContext.newPage();
        //     await tab.goto(`https://apps.tiksuccess.com/quan-ly-listing`);
        //     await tab.waitForLoadState("load");
        //     await tab.waitForTimeout(5000);
        //     await tab.fill("input#rc_select_0", item);
        //     await tab.keyboard.press("Enter");
        //     await tab.waitForLoadState("load");
        //     await tab.waitForTimeout(2000);
        //     await tab.click('tbody tr:nth-child(2) td:last-child span:has-text("Đăng sản phẩm")');
        // });
        // await Promise.all(profileTabs);

        await browser.close();
        // const profileTabs = profiles.map(async (item: string) => {
        //     const tab = await browserContext.newPage();
        //     await tab.goto(`https://apps.tiksuccess.com/quan-ly-listing`);
        //     await tab.waitForLoadState("load");
        //     await tab.waitForTimeout(2000);
        //     await tab.fill("input#rc_select_0", item);
        //     await tab.keyboard.press("Enter");
        //     await tab.waitForLoadState("load");
        //     await tab.waitForTimeout(2000);
        //     await tab.click("span:has-text('Tạo mới Listing')");
        //     await tab.waitForLoadState("load");
        //     await tab.waitForTimeout(2000);
        //     await tab.fill("input#CreateListing_number_sku", fileNames.length + "");
        //     await tab.click("input#CreateListing_product_id");
        //     await tab.keyboard.press("Enter");
        //     await tab.waitForLoadState("load");
        //     await tab.waitForTimeout(2000);
        //     await tab.fill("input#CreateListing_quantity", "10");
        //     await tab.click("span:has-text('Tạo Listing')");
        //     await tab.waitForLoadState("load");
        //     await tab.waitForTimeout(4000);
        //     for (const [index, fileName] of fileNames.entries()) {
        //         await tab.click(`tbody tr:nth-child(${index + 2}) span[title='Edit Listing']`);
        //         await tab.setInputFiles(`tbody tr:nth-child(${index + 2}) .ant-upload-list.ant-upload-list-picture-circle input`, "C:/Users/KBT04/Downloads/Screenshot_11.png");
        //         const filePath = "C:/code/web/zeroti-self-api/keys.txt";
        //         const phrases = await readFile(filePath);
        //         const generatedTitle = generateSingleTitle(fileName, phrases);
        //         console.log(generatedTitle);
        //         await tab.fill(`tbody tr:nth-child(${index + 2}) textarea#product_name`, generatedTitle);
        //         await tab.click(`tbody tr:nth-child(${index + 2}) span b:has-text('Save')`);
        //         await tab.waitForLoadState("load");
        //         await tab.waitForTimeout(2000);
        //     }
        // });
        // await Promise.all(profileTabs);
    } catch (error) {
        console.error("An error occurred:", error);
    } finally {
        // await browser.close();
    }
};