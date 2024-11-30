import { chromium } from "playwright-core";
import { configCookie } from "../../utils/configCookie";
import { ObjectId } from "mongodb";
import { ProfileScanDto } from "../../models/dtos/profileScanDto";
import { mongoPromise } from "../../db/mongo";
interface IPayload {
    url: string;
    post: string;
    assignProfile: string;
    account: string;
}

export const getProfile = async (payload: IPayload) => {
    try {
        function containsKeyword(divText: string | any, keywords: string[]) {
            const lowercasedDivText = divText.toLowerCase();
            return keywords.some((keyword) => lowercasedDivText.includes(keyword.toLowerCase()));
        }
        const listExport = ["zalo", "http", ".com","cảm ơn","giới thiệu","mọi người","cảnh tỉnh","za","lừa đảo","tránh xa","uy tín"];
        const browser = await chromium.launch({
            headless: false,
        });
        const browserContext = await browser.newContext();
        console.log("payload.assign profile :", payload);
        const cookies = await configCookie(payload.account);
        await browserContext.addCookies(cookies);
        const page = await browserContext.newPage();
        await page.waitForLoadState("load");
        await page.waitForTimeout(5000);
        await page.goto(payload.url);
        await page.waitForLoadState("load");
        await page.waitForTimeout(5000);
        await page
            .locator(
                "span.x193iq5w.xeuugli.x13faqbe.x1vvkbs.x1xmvt09.x1lliihq.x1s928wv.xhkezso.x1gmr53x.x1cpjm7i.x1fgarty.x1943h6x.xudqn12.x3x7a5m.x6prxxf.xvq8zen.x1s688f.xi81zsa:has-text('Phù hợp nhất')"
            )
            .click();
        await page.waitForLoadState("load");
        await page.waitForTimeout(5000);
        
        await page
            .locator(
                ".x1i10hfl.xjbqb8w.x1ejq31n.xd10rxx.x1sy0etr.x17r0tee.x972fbf.xcfux6l.x1qhh985.xm0m39n.xe8uvvx.x1hl2dhg.xggy1nq.x1o1ewxj.x3x9cwd.x1e5q0jg.x13rtm0m.x87ps6o.x1lku1pv.x1a2a7pz.xjyslct.x9f619.x1ypdohk.x78zum5.x1q0g3np.x2lah0s.xnqzcj9.x1gh759c.xdj266r.xat24cr.x1344otq.x1de53dj.xz9dl7a.xsag5q8.x1n2onr6.x16tdsg8.x1ja2u2z.x6s0dn4:has-text('Mới nhất')"
            )
            .click();
        await page.waitForLoadState("load");
        await page.waitForTimeout(10000);
        try {
            for(let i=0;i<100;i++){
                await page
                .locator(
                    "span.x193iq5w.xeuugli.x13faqbe.x1vvkbs.x1xmvt09.x1lliihq.x1s928wv.xhkezso.x1gmr53x.x1cpjm7i.x1fgarty.x1943h6x.xudqn12.x3x7a5m.x6prxxf.xvq8zen.x1s688f.xi81zsa:has-text('Xem thêm bình luận')"
                )
                .click();
            await page.waitForLoadState("load");
            await page.waitForTimeout(10000);
            }
        } catch (error) {
            console.log("end of result",error);
        }
        const postTime = await page.$eval(
            "span.x193iq5w.xeuugli.x13faqbe.x1vvkbs.x1xmvt09.x1lliihq.x1s928wv.xhkezso.x1gmr53x.x1cpjm7i.x1fgarty.x1943h6x.x4zkp8e.x676frb.x1nxh6w3.x1sibtaa.xo1l8bm.xi81zsa.x1yc453h span span:nth-child(2)",
            (el) => el.textContent
        );
        const post = new ObjectId(payload.post);
        const assignProfile = new ObjectId(payload.assignProfile);
        const db = await mongoPromise;
        db.linkPost.updateOne({ _id: new ObjectId("65a025dbf40c81ccc30c428b") }, { $set: { postTime } });

        const data = await page.$$eval(".x1pi30zi.x1swvt13.x1n2onr6>.x1gslohp>div:not(:first-child)", async (els) => {
            const profileScan = els.map(async (el) => {
                let nameProfile = "";
                try {
                    nameProfile = el.querySelector(
                        "a.x1i10hfl.xjbqb8w.x1ejq31n.xd10rxx.x1sy0etr.x17r0tee.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x1ypdohk.xt0psk2.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x16tdsg8.x1hl2dhg.xggy1nq.x1a2a7pz.x1heor9g.xt0b8zv"
                    ).textContent;
                } catch (error) {}
                let cmtTime = "";
                try {
                    cmtTime = el.querySelector(
                        "li.x1rg5ohu.x1emribx.x1i64zmx span.x4k7w5x.x1h91t0o.x1h9r5lt.x1jfb8zj.xv2umb2.x1beo9mf.xaigb6o.x12ejxvf.x3igimt.xarpa2k.xedcshv.x1lytzrv.x1t2pt76.x7ja8zs.x1qrby5j"
                    ).textContent;
                } catch (error) {}
                let linkProfile = "";
                try {
                    linkProfile = el
                        .querySelector(
                            "a.x1i10hfl.xjbqb8w.x1ejq31n.xd10rxx.x1sy0etr.x17r0tee.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x1ypdohk.xt0psk2.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x16tdsg8.x1hl2dhg.xggy1nq.x1a2a7pz.x1heor9g.xt0b8zv"
                        )
                        .getAttribute("href");
                } catch (error) {}
                let content = "";
                try {
                    content = el.querySelector(".xdj266r.x11i5rnm.xat24cr.x1mh8g0r.x1vvkbs").textContent;
                } catch (error) {}
                const convertTime = (time:string)=>{
                    let hourTime:number;
                    const [number,type]=time.split(" ");
                    switch (type) {
                        case 'phút':
                            hourTime = Number(number)/60
                            break;
                        case 'giờ':
                            hourTime = Number(number)
                            break;
                        case 'ngày':
                            hourTime = Number(number)*24
                            break;
                        case 'tuần':
                            hourTime = Number(number)*7*24
                            break;
                    
                        default:
                            hourTime = Number(number)
                
                            break;
                    }
                    return hourTime;
                }
                return { nameProfile, linkProfile: linkProfile.slice(0, linkProfile.indexOf("comment_id")), cmtTime:convertTime(cmtTime), content };
            });
            const result = await Promise.all(profileScan);
            return result;
        });
        function removeTrailingCharacters(str: string) {
            return str.replace(/[\/\?&]$/, "");
        }
        for (const { nameProfile, linkProfile, content, cmtTime } of data) {
            if (content.length == 0 || nameProfile.length == 0 || linkProfile.length == 0 || containsKeyword(content, listExport) || content.length > 150 ) continue;
            const existData = await db.profileScan.findOne({ link: linkProfile });
            if (existData) {
                console.log("data already have in database");
                continue;
            }
            const profileData = ProfileScanDto.createObj({
                name: nameProfile,
                link: removeTrailingCharacters(linkProfile),
                content,
                cmtTime,
                post,
                assignProfile,
            });
            await db.profileScan.insertOne({ ...profileData, _id: new ObjectId() });
        }
        await browserContext.close();
        return;
    } catch (error) {
        console.error(error);
    }
};
