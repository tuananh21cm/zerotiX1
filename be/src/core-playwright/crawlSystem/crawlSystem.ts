import { chromium } from "playwright-core";

const listSeller = [
    { name: "Trần Tuấn Anh", sellerId: "147" },
    { name: "Trần Duy Đức", sellerId: "62" },
    { name: "Hoàng Văn Phúc", sellerId: "73" },
    { name: "Đỗ Thị Thu Thảo", sellerId: "98" },
    { name: "Lê Thị Thiện", sellerId: "103" },
    { name: "Trần Quang Anh", sellerId: "148" },
    { name: "Trần Đức Tuấn", sellerId: "186" },
    { name: "Nguyễn Thị Hồng Hạnh", sellerId: "201" }
];
const baseCost = [
    {
        size: "S",
        price: "6.4",
    },
    {
        size: "M",
        price: "6.4",
    },
    {
        size: "L",
        price: "6.4",
    },
    {
        size: "XL",
        price: "6.4",
    },
    {
        size: "2XL",
        price: "7.9",
    },
    {
        size: "3XL",
        price: "9.4",
    },
    {
        size: "4XL",
        price: "10.9",
    },
    {
        size: "5XL",
        price: "10.9",
    },
];
const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = today.getFullYear();
    return `${day}-${month}-${year}`;
};

const fetchDataForSeller = async (jobPage: any, seller: any) => {
    const { sellerId, name } = seller;
    const currentDate = getCurrentDate();

    await jobPage.goto(
        `https://system.kbt.global/admin/orders/index2?datefilter=${currentDate}+-+${currentDate}&page_count=500&keyword=&show_search=true&type=0&seller_id=${sellerId}&product_type=-1&order_status=3&design_status=0&label_status=0&printer_status=19&product_overview=0&tracking_updated=0&delivered_overview=0&designer_assignee=0&fulfiller_id=0&supplier=99999`
    );
    await jobPage.waitForLoadState("load");
    await jobPage.waitForLoadState("domcontentloaded");
    await jobPage.waitForTimeout(30000);
    const totalNumTag = await jobPage
        .locator(".card-header")
        .getByText("Danh sách đơn hàng") //Danh sách đơn hàng
        .evaluate((el: any) => el.textContent.trim());
    // const totalNumTag = await jobPage.locator('.card+ .card .card-header i').evaluate((el: any) => el.textContent.trim());
    console.log({totalNumTag})
    const amountSold = Number(totalNumTag.match(/\d+/)?.[0]); // Extracts the first number found

    const data = await jobPage
        .locator("tbody tr")
        .evaluateAll((rows: any) =>
            rows.map((row: any) => {
                const tds = row.querySelectorAll("td");
                const amount = tds[0].querySelectorAll(":scope > div").length;
                console.log({ amount }); // Log the amount to see the value
                // Proceed to get other values, ensure these indexes exist to avoid errors
                const secondTd = tds[1]; // Only use this if tds.length > 1
                const thirdTd = tds[2];
                const fifthTd = tds[4];

                const nameSeller = secondTd ? secondTd.querySelector('option[selected="selected"]')?.textContent.trim() : null;
                const nameAcc = secondTd ? secondTd.querySelector(".profile_copy")?.textContent.trim() : null;
                const date = thirdTd ? thirdTd.querySelector("p:last-child")?.textContent.trim() : null;
                const subTotal = fifthTd ? fifthTd.querySelector(".col-md-6 ~ .col-md-6 + .col-md-6 strong:nth-child(1)")?.textContent.trim() : null;
                const estAmount = fifthTd ? fifthTd.querySelector("br + strong")?.textContent.trim() : null;

                return {
                    nameSeller,
                    nameAcc,
                    date,
                    subTotal,
                    estAmount,
                    amount, // This will reflect the correct count of <div> elements
                };
            })
        )
        .then((results: any) => results.filter((item: any) => Object.values(item).every((value) => value !== null)));
    // Return the data for this seller including the name
    return { name, amountSold };
};
const getCurrentMonthFixedDateFilter = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Get month as "MM"

    const startDate = `01-${month}-${year}`;
    const endDate = `30-${month}-${year}`;

    return `${startDate}+-+${endDate}`;
};

// Generate the URL with the fixed dates
const dateFilter = getCurrentMonthFixedDateFilter();
const url = `https://system.kbt.global/admin/reports/report_by_date?datefilter=${dateFilter}&group_id=15&seller_id=0`;
export const crawlSystem = async () => {
    const browser = await chromium.launch({ headless: true });
    const browserContext = await browser.newContext();
    const jobPage = await browserContext.newPage();

    // Intercept requests to block images
    await jobPage.route("**/*", (route) => {
        const request = route.request();
        if (request.resourceType() === "image") {
            route.abort();
        } else {
            route.continue();
        }
    });

    try {
        await jobPage.goto("https://system.kbt.global/");
        await jobPage.waitForLoadState("domcontentloaded");
        await jobPage.fill("input#email", "teamX1@kbt.global");
        await jobPage.fill("input#password", "446ade18f3d6d335fc66");
        await jobPage.click("button.btn.btn-primary:has-text('Login')");
        await jobPage.waitForLoadState("load");
        await jobPage.waitForLoadState("domcontentloaded");
        const reportView = await browserContext.newPage(); 
        await reportView.goto(url);
        const namesReport = await reportView.$$eval("tbody td:nth-child(2)",els=>els.map(el=>el.textContent.replace("\n","").trim()));
        const coefficient = await reportView.$$eval("tbody td:nth-child(8)",els=>els.map(el=>el.textContent.replace("\n","").trim()));
        const soldReport =await reportView.$$eval("tbody td:nth-child(4)",els=>els.map(el=>el.textContent.replace("\n","").trim()));
        
        // Create an array of promises for fetching data for all sellers
        const sellerDataPromises = listSeller.map(async (seller) => {
            const newTab = await browserContext.newPage(); // Create a new tab for each seller
            const sellerData = await fetchDataForSeller(newTab, seller);
            // await newTab.close(); // Close the tab after fetching data
            return sellerData;
        });

        const allSellerData = await Promise.all(sellerDataPromises); 
        const totalSold  = allSellerData.reduce((sum, item) => sum + item.amountSold, 0);
        await jobPage.close();
        return {
            totalSold,
            detail:allSellerData,
            reportMonth:{namesReport,soldReport,coefficient}
        };
    } catch (error) {
        console.error("Error in httpTrigger:", error);
    }
    finally{
        await browserContext.close();
        await browser.close();
    }
};
