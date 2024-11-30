import { Page } from "playwright";

export const waitLoad = async(page:Page,timer:number=5000)=>{
    await page.waitForLoadState('load');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(timer);
};