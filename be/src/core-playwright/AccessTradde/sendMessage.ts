import { chromium } from "playwright";
import { mongoPromise } from "../../db/mongo";
import { ObjectId } from "mongodb";
import { configGetCookieFromFile } from "../../utils/configGetCookieFromFile";
import { configCookie } from "../../utils/configCookie";
import { updateTrashProfile } from "../../routes/ProfileScan/service/updateProfile";

interface IPayloadMessage{
    idProfile:string
    profileUrl:string
    accountId:string
    account:string
}
export const sendMessage = async function (payload:IPayloadMessage) {
    const browser = await chromium.launch({
        headless: false,
    });
    const browserContext = await browser.newContext();
    const cookie = await configCookie(payload.account);

    await browserContext.addCookies(cookie);
    const page = await browserContext.newPage();
    try {
        await page.waitForTimeout(10000);
        await page.goto(payload.profileUrl);
        await page.waitForLoadState("load"); 
        await page.waitForTimeout(3000);
        await page.locator(".xsgj6o6.xw3qccf.x1xmf6yo.x1w6jkce.xusnbm3 .x1lliihq.x6ikm8r.x10wlt62.x1n2onr6.xlyipyv.xuxw1ft:has-text('Nhắn tin')").click();
        await page.waitForTimeout(3000);
        // try {
        //     await page.locator(".xsgj6o6.xw3qccf.x1xmf6yo.x1w6jkce.xusnbm3 .x1lliihq.x6ikm8r.x10wlt62.x1n2onr6.xlyipyv.xuxw1ft:has-text('Thêm bạn bè')").click();
        // } catch (error) {
        //     console.log("this guy dont have Add Friend button");
        // } 
        // await page.waitForTimeout(3000);
        // await page.locator('div[aria-label="Gửi lượt thích"]').click();
        await page.keyboard.press("Enter");
        await page.waitForTimeout(5000);
        // await page.keyboard.type("Em chào anh/chị , em là nhân viên tư vấn vay tiền bên Ngân Hàng .",{delay:1000});
        // await page.waitForTimeout(10000);
        // await page.keyboard.press("Enter");
        // await page.waitForTimeout(10000);
        await page.keyboard.type(
            "Chào anh/chị , Bên em cho vay tiền làm hồ sơ thủ tục đơn giản , lãi suất thấp , giải ngân trong ngày , không thu phí hồ sơ , không thu phí bảo hiểm .",{delay:1000}
        );
        await page.waitForTimeout(10000);
        await page.keyboard.press("Enter");
        await page.waitForTimeout(10000);
        await page.keyboard.type("Anh/chị vào đây điền thông tin khoản vay nhé : https://shorten.asia/Rje7bBde",{delay:1000});
        await page.waitForTimeout(10000);
        await page.keyboard.press("Enter");
       
        await page.waitForTimeout(300000);
        const db = await mongoPromise; 
        const result = await db.profileScan.updateOne({ _id: new ObjectId(payload.idProfile) }, { $set: { iSendMessage:true } });
        console.log('result :',result);
    } catch (error) {
        console.error("something wrong with this account");
        console.error(error);
    }
    await page.close();
    await browser.close();
    await browserContext.close();
    await updateTrashProfile({ profileId: payload.idProfile, url:payload.profileUrl });
};
