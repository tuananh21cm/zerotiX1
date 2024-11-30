
import { chromium } from "playwright-core";
import { configCookie } from "../../utils/configCookie";

export const getCss = async()=>{

    const browser = await chromium.launch({
        headless: false
    });
    const browserContext = await browser.newContext();
    const cookie2 = [{"domain":".facebook.com","expirationDate":1740280061.017038,"hostOnly":false,"httpOnly":true,"name":"sb","path":"/","sameSite":"no_restriction","secure":true,"session":false,"storeId":"0","value":"HQl6ZFxTtjtShzDf_Ggz9q3e"},{"domain":".www.facebook.com","expirationDate":1736359098,"hostOnly":false,"httpOnly":false,"name":"m_ls","path":"/","sameSite":"no_restriction","secure":true,"session":false,"storeId":"0","value":"%7B%22c%22%3A%7B%221%22%3A%22HCwAABayhKoCFuLpi-MIEwUWnJWV_Li9LQA%22%2C%222%22%3A%22GSwVQBxMAAAWDhbsseTWDBYAABV-HEwAABYAFuyx5NYMFgAAFigA%22%2C%2295%22%3A%22HCwAABbWNBbA0qGTDBMFFpyVlfy4vS0A%22%7D%2C%22d%22%3A%22f46881e7-2dc1-483e-8c93-875bb6dabdf0%22%2C%22s%22%3A%220%22%2C%22u%22%3A%226814hh%22%7D"},{"domain":".facebook.com","expirationDate":1737565231.309506,"hostOnly":false,"httpOnly":true,"name":"datr","path":"/","sameSite":"no_restriction","secure":true,"session":false,"storeId":"0","value":"LcyBZVs-Dyo90fDSVVdlG58b"},{"domain":".facebook.com","expirationDate":1706324865,"hostOnly":false,"httpOnly":false,"name":"wd","path":"/","sameSite":"lax","secure":true,"session":false,"storeId":"0","value":"2304x1054"},{"domain":".facebook.com","expirationDate":1706324865,"hostOnly":false,"httpOnly":false,"name":"dpr","path":"/","sameSite":"no_restriction","secure":true,"session":false,"storeId":"0","value":"0.8333333730697632"},{"domain":".facebook.com","expirationDate":1737256061.017158,"hostOnly":false,"httpOnly":false,"name":"c_user","path":"/","sameSite":"no_restriction","secure":true,"session":false,"storeId":"0","value":"100011664909646"},{"domain":".facebook.com","expirationDate":1737256061.017193,"hostOnly":false,"httpOnly":true,"name":"xs","path":"/","sameSite":"no_restriction","secure":true,"session":false,"storeId":"0","value":"34%3AdKvwRBAQBwFhOA%3A2%3A1705720057%3A-1%3A6385"},{"domain":".facebook.com","expirationDate":1713496061.359807,"hostOnly":false,"httpOnly":true,"name":"fr","path":"/","sameSite":"no_restriction","secure":true,"session":false,"storeId":"0","value":"1bZa2T5srLNHZL1bs.AWVEm9DzdZx_QUzsgPnsp2bai8c.Blqzjk.bT.AAA.0.0.Blqzj7.AWUQqCKeCP4"},{"domain":".facebook.com","hostOnly":false,"httpOnly":false,"name":"presence","path":"/","sameSite":"unspecified","secure":true,"session":true,"storeId":"0","value":"C%7B%22t3%22%3A%5B%5D%2C%22utc3%22%3A1705720067970%2C%22v%22%3A1%7D"}]
    const cookies = configCookie(cookie2)

    await browserContext.addCookies(cookies);
    const page = await browserContext.newPage();
    await page.waitForLoadState('load');
    await page.waitForTimeout(5000);
    await page.goto("https://www.facebook.com");

};
(async()=>await getCss())();
