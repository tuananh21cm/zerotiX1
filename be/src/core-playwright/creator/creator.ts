import { chromium } from "playwright-core";
import { configCookie } from "../../utils/configCookie";
import { addCreator } from "../../routes/creator/service/addCreator";

export interface ICreator {
    name: string;
    userName: string;
    GMV: string;
    itemSolds: string;
    AvgViews: string;
    followerCount: string;
}

const listData: ICreator[] = [];

export const creator = async function (): Promise<void> {
    console.log("Starting infinite data scraping...");
    try {
        const browser = await chromium.launch({ headless: false });
        const browserContext = await browser.newContext();
        const cookie = await configCookie("profileKiki");
        await browserContext.addCookies(cookie);

        const categories = [
             "Men's Tops",
          "Men's Bottoms",
          "Men's Special Occasion Clothing",
          "Men's Underwear & Socks",
          "Men's Sleepwear & Loungewear",
          "Men's Suits & Sets"
        ];

        // Function to process a single category in a new tab
        const processCategoryInNewTab = async (category: string): Promise<void> => {
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
                await page.goto("https://affiliate-us.tiktok.com/connection/creator?shop_region=US");
                await page.waitForLoadState("domcontentloaded");
                await page.waitForTimeout(10000);
                await page.click('span.arco-icon-hover.arco-modal-close-icon');
                await page.waitForTimeout(6000);
                await page.click(".arco-radio:nth-child(1) .text-body-m-regular");
                await page.waitForLoadState("load");
                await page.waitForTimeout(6000);
                await page.click("div#categories");
                await page.waitForLoadState("load");
                await page.waitForTimeout(6000);
                await page.click("div#arco-cascader-popup-0 div div:first-child ul li:nth-child(23)");
                await page.waitForLoadState("load");
                await page.waitForTimeout(6000);
                await page.click(`text="${category}"`);
                await page.waitForSelector("div#arco-cascader-popup-0 div div:nth-child(2) ul");
                console.log(`Successfully processed category: ${category}`);

                while (true) {
                    await page.waitForTimeout(3000);
                    await page.keyboard.press("End");
                    await page.waitForTimeout(3000);
                    const rowData = await page.$$("tbody tr");

                    const rows = await Promise.all(
                        rowData.map(async (row) => {
                            const userName = await row.$eval(".text-body-m-medium.text-overflow-single", el => el.textContent.trim());
                            const name = await row.$eval(".text-neutral-text4.text-overflow-single", el => el.textContent.trim());
                            const GMV = await row.$eval(".arco-table-td:nth-child(3) .justify-end", el => el.textContent.trim());
                            const itemSolds = await row.$eval(".arco-table-td:nth-child(4) .justify-end", el => el.textContent.trim());
                            const AvgViews = await row.$eval(".arco-table-td:nth-child(5) .justify-end", el => el.textContent.trim());
                            const followerCount = await row.$eval("span.text-body-s-regular.text-neutral-text1.flex.text-overflow-single", el => el.textContent.trim().split(",")[0]);
                            console.log(userName, name, GMV, itemSolds, AvgViews, followerCount);
                            return {
                                userName,
                                name,
                                GMV,
                                itemSolds,
                                AvgViews,
                                followerCount,
                                fatherCategory: "Womenswear & Underwear",
                                childCategory: category
                            };
                        })
                    );

                    const newRows = rows.filter(row => !listData.some(existing => existing.userName === row.userName));
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
                console.error(`Error processing category: ${category}`, error);
            } finally {
                await page.close();
            }
        };

        // Process all categories concurrently
        await Promise.all(categories.map(category => processCategoryInNewTab(category)));

        console.log("All categories processed.");
        await browserContext.close();
        await browser.close();
    } catch (error) {
        console.error("An error occurred:", error);
    }
};
