import { chromium } from "playwright-core";
import { configCookie } from "../../utils/configCookie";
import { parseFacebookIframeSrc } from "../../utils/parseFacebookIframeSrc";
import { scrollFunc } from "../../utils/scrollFunc";
import { mongoPromise } from "./../../db/mongo";
import { LinkPostDto } from "../../models/dtos/linkPostDto";
import { ObjectId } from "mongodb";
const listKeyWord = [
    "cccd",
    "cmnd",
    "thế chấp",
    "thẩm định",
    "đăng ký vay",
    "credit",
    "vay tiền",
    "ngân hàng",
    "tín dụng",
    "giải ngân",
    "nợ xấu",
    "đáo hạn",
    "sổ đỏ",
    "thế chấp",
]; //Sponsored
const listExport = [
    "cà phê",
    "thu hồi",
    "iphone",
    "apple",
    "chứng khoán",
    "lẩu",
    "nướng",
    "treo vốn",
    "treo tiền",
    "luật sư",
    "tele",
    "địa chỉ",
    "bảo hành",
    "kinh đô",
    "tai nghe",
    "ốp dây",
    "cường lực",
    "bảo hành",
    "laz",
    "shopee",
    "lazada",
    "tiki",
    "luật",
    "khám",
];
export const scrollFromSearch = async (cookie: any) => {
    const db = await mongoPromise;
    try {
        const listSeed = [
            // 'vay vốn','vay tiền',
        "vay sinh viên","app vay tiền ","vay lãi suất thấp","vay đáo hạn",'hỗ trợ vay tiền nợ xấu',"vay trả góp ","vay tiền không thẩm định","vay tiền ứng dụng","cho vay giải ngân luôn","vay thế chấp","vay tín chấp","vay không thẩm định","giải ngân trong ngày","hỗ trợ nợ xấu"
    ];
        for(const item of listSeed){
            const browser = await chromium.launch({
                headless: false,
            });
            const browserContext = await browser.newContext();
            const page = await browserContext.newPage();
            await browserContext.addCookies(cookie);
            await page.goto("https://www.facebook.com");
            await page.waitForTimeout(5000);
            await page.waitForLoadState("load");
            await page.waitForLoadState("domcontentloaded");
            function containsKeyword(divText: string | any, keywords: string[]) {
                const lowercasedDivText = divText.toLowerCase();
                return keywords.some((keyword) => lowercasedDivText.includes(keyword.toLowerCase()));
            }
            await page.waitForLoadState("load");
            await page.waitForLoadState("domcontentloaded");
            await page.waitForTimeout(10000);
            await page.locator("input.x1i10hfl.xggy1nq.x1s07b3s.x1kdt53j.x1yc453h.xhb22t3.xb5gni.xcj1dhv.x2s2ed0.xq33zhf.xjyslct.xjbqb8w.xnwf7zb.x40j3uw.x1s7lred.x15gyhx8.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.xzsf02u.xdl72j9.x1iyjqo2.xs83m0k.xjb2p0i.x6prxxf.xeuugli.x1a2a7pz.x1n2onr6.x15h3p50.xm7lytj.x1sxyh0.xdvlbce.xurb0ha.x1vqgdyp.x1xtgk1k.x17hph69.xo6swyp.x1ad04t7.x1glnyev.x1ix68h3.x19gujb8").click();
            await page.waitForTimeout(3000);
            await page.keyboard.type(item);
            await page.keyboard.press("Enter");
            let breakLoop:boolean=false;
            setTimeout(()=>{
                breakLoop=true;
            },600000)
            while (!breakLoop) {
                await page.waitForLoadState("load");
            await page.waitForLoadState("domcontentloaded");
                await page.waitForTimeout(10000);
                await page.waitForSelector("a.x1i10hfl.xjbqb8w.x1ejq31n.xd10rxx.x1sy0etr.x17r0tee.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x1ypdohk.xt0psk2.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x16tdsg8.x1hl2dhg.xggy1nq.x1a2a7pz.x1heor9g.xt0b8zv.xo1l8bm:not(.selected)")
                const checkAd = await page.$(
                    "a.x1i10hfl.xjbqb8w.x1ejq31n.xd10rxx.x1sy0etr.x17r0tee.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x1ypdohk.xt0psk2.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x16tdsg8.x1hl2dhg.xggy1nq.x1a2a7pz.x1heor9g.xt0b8zv.xo1l8bm:not(.selected)"
                );
                await checkAd?.scrollIntoViewIfNeeded();
                await page.evaluate((element) => {
                    element?.classList.add("selected");
                }, checkAd);
                await checkAd?.hover();
                await page.waitForLoadState("load");
                await page.waitForLoadState("domcontentloaded");
                await page.waitForTimeout(3000);
                const checktext = await checkAd?.getAttribute("href");
                if (checktext?.includes("ads")) {
                    const contentpostHandle = await checkAd?.evaluateHandle(
                        (i) =>
                            i?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement
                                ?.parentElement?.textContent
                    );
                    const contentpost = await contentpostHandle?.jsonValue();
                    if (containsKeyword(contentpost, listKeyWord) && !containsKeyword(contentpost, listExport)) {
                        const parentElHandle = await checkAd?.evaluateHandle(
                            (i) => i?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement
                        );
                        if (parentElHandle) {
                            const parentEl = parentElHandle.asElement();
                            if (parentEl) {
                                const threeDot = await parentEl.$(".xqcrz7y.x78zum5.x1qx5ct2.x1y1aw1k.x1sxyh0.xwib8y2.xurb0ha.xw4jnvo");
                                if (threeDot) {
                                    await threeDot.click();
                                }
                            }
                        }
                        await page.waitForLoadState("load");
                        await page.waitForLoadState("domcontentloaded");
                        await page.waitForTimeout(5000);
                        try {
                            const getLink = await page.$(
                                'span.x193iq5w.xeuugli.x13faqbe.x1vvkbs.x1xmvt09.x1lliihq.x1s928wv.xhkezso.x1gmr53x.x1cpjm7i.x1fgarty.x1943h6x.xudqn12.x3x7a5m.x6prxxf.xvq8zen.xk50ysn.xzsf02u.x1yc453h:has-text("Nhúng")'
                            );
                            await getLink?.click();
                            await page.waitForLoadState("load");
                            await page.waitForLoadState("domcontentloaded");
                            await page.waitForTimeout(5000);
                            const linkRaw = await page.$eval(
                                "input.x1i10hfl.xggy1nq.x1s07b3s.x1kdt53j.x1a2a7pz.xmjcpbm.x1n2xptk.xkbpzyx.xdppsyt.x1rr5fae.xhk9q7s.x1otrzb0.x1i1ezom.x1o6z2jb.x9f619.xzsf02u.x1qlqyl8.xk50ysn.x1y1aw1k.xn6708d.xwib8y2.x1ye3gou.xh8yej3.xha3pab.xyc4ar7.x10lcxz4.xzt8jt4.xiighnt.xviufn9.x1b3pals.x10bruuh.x1yc453h.xc9qbxq",
                                (el) => el.getAttribute("value")
                            );
                            if (linkRaw) {
                                const namePost=""
                                // const namePost = await checkAd?.evaluate(el=>el?.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector(".xu06os2.x1ok221b h4 span a").textContent);
                                // const like = await checkAd?.evaluate(el=>el?.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector("span.xt0b8zv.x1e558r4").textContent);
                                // const comment = await checkAd?.evaluate(el=>el?.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector(".x9f619.x1n2onr6.x1ja2u2z.x78zum5.xdt5ytf.x2lah0s.x193iq5w.xeuugli.xg83lxy.x1h0ha7o.x10b6aqq.x1yrsyyn:").textContent);
                                const actuallyUrl = parseFacebookIframeSrc(linkRaw);
                                const postData = LinkPostDto.createObj({ namePost,  url: actuallyUrl, rawUrl: linkRaw });
                                await db.linkPost.insertOne({ ...postData, _id: new ObjectId() });
                            }
                            await page.waitForTimeout(60000);
                            await page.keyboard.press("Escape");
                            await page.waitForLoadState("load");
                            await page.waitForLoadState("domcontentloaded");
                            await page.waitForTimeout(5000);
                        } catch (error) {
                            console.log(error);
                            continue;
                        }
                        await page.waitForLoadState("load");
                        await page.waitForLoadState("domcontentloaded");
                        await page.waitForTimeout(5000);
                    }
                }
                await scrollFunc(page, 1000);
            }
            await page.close();
            await browserContext.close();
            await browser.close();
        }
    } catch (error) {
        console.error(error)
    }
};
