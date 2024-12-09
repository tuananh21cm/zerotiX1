// import { chromium, Page } from "playwright-core";
// import { configCookie } from "../../utils/configCookie";
// import { addCreator } from "../../routes/creator/service/addCreator";

// export interface IKeyFollowShopPlus {
//     productUrl:string;
//     rank:number;
//     imageUrl:string;
//     title:string;
//     sales7Days:string;
//     totalSales:string;
// }

// export const creatorShopPlus = async function (): Promise<void> {
//     console.log("Starting infinite data scraping...");
//         const browser = await chromium.launch({ headless: false });
//         const browserContext = await browser.newContext();
//         const cookie = await configCookie("shopplus");
//         await browserContext.addCookies(cookie);
//             const page = await browserContext.newPage();
//             await page.route("**/*", (route) => {
//                 const request = route.request();
//                 if (request.resourceType() === "image") {
//                     route.abort(); // Block image requests
//                 } else {
//                     route.continue(); // Allow other requests
//                 }
//             });
//             try {

//                 //click shop 

//                 await page.goto("https://www.shoplus.net/login");
//                 await page.waitForTimeout(5000);
//                 await page.fill("input[placeholder='Please enter the email']","ducbes98@gmail.com");
//                 await page.fill("input[placeholder='Please enter the password']","Ducbes1202@");
//                 await page.click("button:has-text('Confirm')");
//                 await page.waitForLoadState("load");
//                 await page.waitForLoadState("domcontentloaded");
//                 await page.waitForTimeout(10000);
//                 await page.goto("https://www.shoplus.net/discovery/products?keyword=rizzler&tranlateKeyword=&source=&target=");
//                 await page.waitForLoadState("load");
//                 await page.waitForLoadState("domcontentloaded");
//                 await page.waitForTimeout(10000);
//                   await page.click("div[title='Country'] div div:nth-child(1) img");
//                 await page.waitForLoadState("load");
//                 await page.waitForTimeout(5000);
//                 const extractData = async (page: Page): Promise<IKeyFollowShopPlus[]> => {
//                     const listData = await page.$$eval("tr.vxe-body--row", (rows) =>
//                       rows.map((row) => {
//                         // Extract each key from the row
//                         const imageElement = row.querySelector(".el-image.w-70px.h-70px.rounded-8px.el-tooltip__trigger.el-tooltip__trigger.w-70px.h-70px.rounded-8px.el-tooltip__trigger.el-tooltip__trigger img.el-image__inner"); // Adjust the selector
//                         const titleElement = row.querySelector(".title-class"); // Adjust the selector
//                         const sales7DaysElement = row.querySelector(".sales-7days-class"); // Adjust the selector
//                         const totalSalesElement = row.querySelector(".total-sales-class"); // Adjust the selector
                  
//                         return {
//                           productUrl: productLinkElement?.getAttribute("href") || "",
//                           rank: parseInt(rankElement?.textContent?.trim() || "0", 10),
//                           imageUrl: imageElement?.getAttribute("src") || "",
//                           title: titleElement?.textContent?.trim() || "",
//                           sales7Days: sales7DaysElement?.textContent?.trim() || "",
//                           totalSales: totalSalesElement?.textContent?.trim() || "",
//                         };
//                       })
//                     );
                  
//                     return listData;
//                   };
//                   console.log({extractData});
//             } catch (error) {
//                 console.error(`Error processing category:`,error);
//             } finally {
//                 // await page.close();
//             }
// };
