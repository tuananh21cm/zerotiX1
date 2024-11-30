import { firefox } from "playwright-core";
import * as XLSX from 'xlsx';
import { configCookie } from "../../utils/configCookie";

export const genTitle = async function (fileName:string,listKeys:string[]): Promise<void> {
    const important = ["T-Shirt"];
    const niceToHave = [
        'Shirt', 'T-Shirt', 'Top', 'Unisex', 'Print', 'Relaxed Fit',"Vintage","Retro 90s","Viral","Trendy","Funny",
        'StreetWear', 'Roud Neck', 'Crewneck', 'Graphic Design', 'Cotton',
        'Oversized', 'Womenswear', 'Menswear', 'Top', 'Clothing', 'Tee', "Gift For Men", "Gift For Her", "Graphic Design", "Trendy", "HipHop", "Rap Fan"
    ];
    // const listKeys = ["23 Is Back Match Tee 4S White Thunder",
    // "Luc Lolipop Match Tee 4S White Thunder",
    // "BIG WORM Match Tee 4S White Thunder",
    // "DeathRow Records Match Tee 4S White Thunder",
    // "Defton Around The Fur Cat Match Tee 4S White Thunder",
    // "Free Big Face Thugga Match Tee 4S White Thunder",
    // "Get Money Match Tee 4S White Thunder",
    // "Hussle Head Match Tee 4S White Thunder",
    // "Drakee Match Tee 4S White Thunder",
    // "Frankk Match Tee 4S White Thunder",];
    const numberGenerate = 50;
    try {
        const browser = await firefox.launch({
            headless: false,
        });
        const browserContext = await browser.newContext();
        const cookie = await configCookie("");
    
        await browserContext.addCookies(cookie);
        const page = await browserContext.newPage();
        await page.goto("https://chatgpt.com/");

        

        await page.fill("#prompt-textarea", `Hi, You are a pro in marketing on TikTok Shop. Can you help me generate ${numberGenerate} titles for my T-shirt shop on TikTok? If you agree, I will provide some main keywords that I currently sell.`);
        await page.keyboard.press("Enter");
        await page.waitForTimeout(10000);
        await page.fill("#prompt-textarea", `I want you to generate for me ${numberGenerate} titles based on ${listKeys.length} keywords, each keyword generating ${Math.round(numberGenerate / listKeys.length)} titles. For example, if I provide 'a,b,c,d,e,f,g,h,j,k' as keywords, output titles will be ' a1.  b1.  c1.  d1.  e1. f1. g1. h1. j1. k1. a2.  b2.  c2.  d2.  e2. f2. g2. h2. j2. k2. a3.  b3 ....'`);
        await page.keyboard.press("Enter");
        await page.waitForTimeout(15000);
        await page.fill("#prompt-textarea", `When generating titles, ensure "${important.join(", ")}" compulsory included in each title, and include at least 4 terms from this list: ${niceToHave.join(", ")}`);
        await page.keyboard.press("Enter");
        await page.waitForTimeout(15000);
        await page.fill("#prompt-textarea", `Remember to generate a list separated by dot "." characters, using the ${listKeys.length} keywords: ${listKeys.map(item => item)}. The output order should be ' a1.  b1.  c1.  d1.  e1. f1. g1. h1. j1. k1. a2.  b2.  c2.  d2.  e2. f2. g2. h2. j2. k2. a3.  b3 ....'and the previous generate cannot same as the next generate , each title need to be at least 50 characters. Please output only the result, with no additional text or headers and dont use 's in the title.   REMEMBER , I NEED RESULT OF "${numberGenerate}" TITLE, AND  DONT OMIT ANY WORD FROM keywords I PROVIDE because the ouput key is all important key , so all words i provide need appear in title `);
        await page.waitForTimeout(5000);
        await page.keyboard.press("Enter");
        await page.waitForTimeout(15000);
        let continueGenerate = false;
        let selectorContent = "article[data-testid='conversation-turn-9'] div "
        try {
            const element = await page.$("button:has-text('Continue generating')");

            if (element) {
                continueGenerate = true;
                await page.click("button:has-text('Continue generating')");
                await page.waitForTimeout(100000);
                selectorContent = "article[data-testid='conversation-turn-10'] div"
            }
            else{
                console.log("dont need generate");
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
        const listResponseRaw = await page.$eval(selectorContent, el => el.textContent.replace("ChatGPT", ""));
        const listResponse = listResponseRaw.split(".").map(item => item.trim()).filter(item => item.length > 0);
        console.log({ listResponse });
        const wb = XLSX.utils.book_new();
        const wsData = listResponse.map(title => [title]);
        const ws = XLSX.utils.aoa_to_sheet(wsData);
        XLSX.utils.book_append_sheet(wb, ws, "Titles");
        XLSX.writeFile(wb, `${fileName}_Title.xlsx`);
    } catch (error) {
        console.error("An error occurred:", error);
    } finally {
        // await browser.close();
    }
};

