import { chromium } from "playwright-core";
import { configCookie } from "../../utils/configCookie";
import { addCreator } from "../../routes/creator/service/addCreator";

// export interface ICreator {
//     name: string;
//     userName: string;
//     GMV: string;
//     itemSolds: string;
//     AvgViews: string;
//     followerCount: string;
// }
export interface ICreator2 {
    // name: string;
    userName: string;
    revenue: string;
    itemSolds: string;
    atv: string;
    products: string;
    videos:string;
    AvgViews:string;
    followerCount:string;

}
const listData: ICreator2[] = [];

export const creatorShopPlus = async function (): Promise<void> {
    console.log("Starting infinite data scraping...");
        const browser = await chromium.launch({ headless: false });
        const browserContext = await browser.newContext();
        const cookie = await configCookie("shopplus");
        await browserContext.addCookies(cookie);
            const page = await browserContext.newPage();
            await page.route("**/*", (route) => {
                const request = route.request();
                if (request.resourceType() === "image") {
                    route.abort(); // Block image requests
                } else {
                    route.continue(); // Allow other requests
                }
            });
            try {

                //click shop 

                await page.goto("https://www.shoplus.net/shop/detail/7495726526340500091?countryCode=US");
                await page.waitForLoadState("domcontentloaded");
                await page.waitForTimeout(10000);
                // await page.click("div[title='Country'] div div:nth-child(1) img");
                // await page.waitForLoadState("load");
                // await page.waitForTimeout(5000);
                // await page.click('//*[@id="cateBox"]/div[2]');
                // await page.waitForLoadState("load");
                // await page.waitForTimeout(5000);
                // await page.hover("div#cateBox div div:has-text('Womenswear & Underwear')");
                // await page.waitForTimeout(5000);
                // await page.click('//*[@id="rising_601152"]/div[2]/div/div[1]/div[1]/div/div/div[3]');


                //start crawl
                await page.click("div#tab-authors");
                await page.waitForLoadState("load");
                await page.waitForTimeout(5000);
                while (true) {
                    await page.waitForTimeout(7000);
                
                    // Check if the "All contents are loaded" message is present
                    const isContentLoaded = await page.$eval(".vxe-grid--bottom-wrapper", el => el.textContent.includes("All contents are loaded"));
                    if (isContentLoaded) {
                        console.log("All contents are loaded. Exiting the loop.");
                        break;
                    }
                
                    await page.keyboard.press("End");
                    await page.waitForTimeout(3000);
                
                    await page.waitForSelector('.content table tbody tr');
                    const rowData = await page.$$('.content table tbody tr');
                    await page.waitForTimeout(3000);
                    console.log(`Found ${rowData.length} rows.`);

                    const rows = await Promise.all(
                        rowData.map(async (row) => {
                            try {
                                // Check if the row contains the desired element
                                const hasDesiredClass = await row.$(".flex-1.el-tooltip__trigger");
                                if (!hasDesiredClass) {
                                    console.log("Skipping row without the required class.");
                                    return null; // Skip this row
                                }
                    
                                // Extract data from the row
                                const userName = await row.$eval(".flex-1.el-tooltip__trigger", el => el.textContent.trim());
                                // console.log({userName})
                                // const revenue = await row.$eval(".vxe-body--column.col_7 .vxe-cell", el => el.textContent.trim());
                                // const itemSolds = await row.$eval(".vxe-body--column.col_8 .vxe-cell", el => el.textContent.trim());
                                // const atv = await row.$eval(".vxe-body--column.col_9 .vxe-cell", el => el.textContent.trim());
                                // const products = await row.$eval(".vxe-body--column.col_10 .vxe-cell", el => el.textContent.trim());
                                // const videos = await row.$eval(".vxe-body--column.col_11 .vxe-cell", el => el.textContent.trim());
                                // const AvgViews = await row.$eval(".vxe-body--column.col_12 .vxe-cell", el => el.textContent.trim());
                                // const followerCount = await row.$eval(".vxe-body--column.col_13 .vxe-cell", el => el.textContent.trim().split(",")[0]);
                                const revenue = "";
                                const itemSolds = "";
                                const atv = "";
                                const products = "";
                                const videos = "";
                                const AvgViews = "";
                                const followerCount = "";
                    
                                console.log(userName, revenue, atv, products, videos, itemSolds, AvgViews, followerCount);
                                return {
                                    userName, revenue, atv, products, videos, itemSolds, AvgViews, followerCount
                                };
                            } catch (error) {
                                console.error("Error processing row:", error);
                                return null; // Handle errors gracefully
                            }
                        })
                    );
                    console.log({rows})
                    const newRows = rows.filter(row => row !== null && !listData.some(existing => existing.userName === row.userName))
                    if (newRows.length > 0) {
                        listData.push(...newRows);
                        console.log(`Added ${newRows.length} new rows to the database`);
                        await addCreator(newRows);
                    } else {
                        console.log("No new unique data found in this scroll.");
                    }
                
                    if (listData.length > 10000) {
                        console.log("Clearing old data from memory.");
                        listData.length = 0;
                    }
                }
                

            } catch (error) {
                console.error(`Error processing category:`,error);
            } finally {
                // await page.close();
            }
};
