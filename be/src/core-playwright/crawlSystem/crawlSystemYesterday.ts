import { chromium, Page } from "playwright-core";

interface Seller {
    name: string;
    sellerId: string;
}

interface BaseCost {
    size: string;
    price: string;
}

interface ProcessedData {
    title: string;
    amount: number;
    image: string;
}

interface SellerData {
    name: string;
    amountSold: number;
    processedData:any
}

interface ReportData {
    namesReport: string[];
    soldReport: string[];
    coefficient: string[];
}

interface CrawlResult {
    totalSold: number;
    detail: SellerData[];
    reportMonth: ReportData;
}

const listSeller: Seller[] = [
    { name: "Trần Tuấn Anh", sellerId: "147" },
    { name: "Trần Duy Đức", sellerId: "62" },
    { name: "Hoàng Văn Phúc", sellerId: "73" },
    { name: "Đỗ Thị Thu Thảo", sellerId: "98" },
    { name: "Lê Thị Thiện", sellerId: "103" },
    { name: "Trần Quang Anh", sellerId: "148" },
    { name: "Trần Đức Tuấn", sellerId: "186" },
    { name: "Nguyễn Thị Hồng Hạnh", sellerId: "201" }
];

const getCurrentDate = (): string => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = today.getFullYear();
    return `${day}-${month}-${year}`;
};
const getYesterdayDate = (): string => {
    const today = new Date();
    today.setDate(today.getDate() - 1); // Subtract one day from today
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = today.getFullYear();
    return `${day}-${month}-${year}`;
};

const getCurrentMonthFixedDateFilter = (): string => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Get month as "MM"
    const startDate = `01-${month}-${year}`;
    const endDate = `30-${month}-${year}`;
    return `${startDate}+-+${endDate}`;
};

const fetchDataForSeller = async (jobPage: Page, seller: Seller): Promise<SellerData> => {
    console.log("go to system ")
    const { sellerId, name } = seller;
    const currentDate = getYesterdayDate();
    await jobPage.route("**/*", (route) => {
        const request = route.request();
        if (["stylesheet", "image", "font", "media", "script"].includes(request.resourceType())) {
            route.abort();
        } else {
            route.continue();
        }
    });
    await jobPage.goto(
        `https://system.kbt.global/admin/orders/index2?datefilter=${currentDate}+-+${currentDate}&page_count=500&keyword=&show_search=true&type=0&seller_id=${sellerId}&product_type=-1&order_status=3&design_status=0&label_status=0&printer_status=19&product_overview=0&tracking_updated=0&delivered_overview=0&designer_assignee=0&fulfiller_id=0&supplier=99999`
    );
    await jobPage.waitForLoadState("domcontentloaded");
    await jobPage.waitForTimeout(60000);

    const totalNumTag = await jobPage.locator(".card-header:has-text('Danh sách đơn hàng')").evaluate((el) =>
        el.textContent?.trim() || ""
    );
    const amountSold = Number(totalNumTag.match(/\d+/)?.[0] || 0); // Extracts the first number found

    const listProfile = await jobPage.$$eval(
        ".product_info.row",
        (els: HTMLElement[]) =>
            els.map((el) => {
                const nameElement = el.querySelector(".col-md-10 a");
                const imageElement = el.querySelector(".image-wrapper.col-md-3 a");

                return {
                    name: nameElement?.textContent?.trim() || "",
                    image: imageElement?.getAttribute("href") || ""
                };
            })
    );

    const countMap: Record<string, { amount: number; image: string }> = {};
    listProfile.forEach(({ name, image }) => {
        if (name) {
            if (countMap[name]) {
                countMap[name].amount += 1;
            } else {
                countMap[name] = { amount: 1, image };
            }
        }
    });

    const processedData: ProcessedData[] = Object.entries(countMap).map(([title, { amount, image }]) => ({
        title,
        amount,
        image
    }));

    console.log({ processedData });

    return { name, amountSold,processedData };
};

export const crawlSystemYesterday = async (): Promise<any> => {
    const browser = await chromium.launch({ headless: false });
    const browserContext = await browser.newContext();
    const jobPage = await browserContext.newPage();

    await jobPage.route("**/*", (route) => {
        const request = route.request();
        if (["stylesheet", "image", "font", "media", "script"].includes(request.resourceType())) {
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
        await jobPage.waitForTimeout(3000)
        await jobPage.click("button.btn.btn-primary:has-text('Login')");
        await jobPage.waitForLoadState("domcontentloaded");
        const reportView = await browserContext.newPage();
        const dateFilter = getCurrentMonthFixedDateFilter();
        const url = `https://system.kbt.global/admin/reports/report_by_date?datefilter=${dateFilter}&group_id=15&seller_id=0`;
        await reportView.goto(url);

        const namesReport = await reportView.$$eval("tbody td:nth-child(2)", (els) =>
            els.map((el) => el.textContent?.trim() || "")
        );
        const coefficient = await reportView.$$eval("tbody td:nth-child(8)", (els) =>
            els.map((el) => el.textContent?.trim() || "")
        );
        const soldReport = await reportView.$$eval("tbody td:nth-child(4)", (els) =>
            els.map((el) => el.textContent?.trim() || "")
        );

        const sellerDataPromises = listSeller.map(async (seller) => {
            const newTab = await browserContext.newPage();
            const sellerData = await fetchDataForSeller(newTab, seller);
            await newTab.close(); // Close the tab after fetching data
            return sellerData;
        });

        const allSellerData = await Promise.all(sellerDataPromises);
        const totalSold = allSellerData.reduce((sum, item) => sum + item.amountSold, 0);

        return {
            totalSold,
            detail: allSellerData,
            reportMonth: { namesReport, soldReport, coefficient }
        };
    } catch (error) {
        console.error("Error in crawlSystem:", error);
    } finally {
        await browserContext.close();
        await browser.close();
    }
};
