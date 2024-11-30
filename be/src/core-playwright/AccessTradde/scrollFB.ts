import { chromium } from "playwright-core";
import { configCookie } from "../../utils/configCookie";
import { parseFacebookIframeSrc } from "../../utils/parseFacebookIframeSrc";
import { scrollFunc } from "../../utils/scrollFunc";
import { mongoPromise } from "./../../db/mongo";
import { LinkPostDto } from "../../models/dtos/linkPostDto";
import { ObjectId } from "mongodb";
import { scrollFromSearch } from "./scrollFromSearch";
// import { ICookie } from "./seedingFb";
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
const listSeedPost = [
    "https://www.facebook.com/permalink.php?story_fbid=pfbid02egaeQ2w3qwXdj9jBXcFHfQbaywAdH4ezxDsRujuJhdF32spqXaXUhPsbcJWWozg4l&id=100066618816265",
    "https://www.facebook.com/FECREDIT.VN/posts/pfbid0YcvdEfauvgYB7pPYGKdgZbFtyPkJGy7MLt4SK7rvnXFjSh6qWA5LjJMpPD8pDKBsl",
    "https://www.facebook.com/permalink.php?story_fbid=pfbid02T28hJi71XHzoveN5kDCjUvWkMiTz7o6EfZRaTKyoHFq4ZJUs6sddtKhKzeVvqKkZl&id=61551122004212",
    "https://www.facebook.com/mothetindungnhanhso1/posts/pfbid02VRvTJ8AXqXdbKyCafjko6tFQW1mPebJ9AkbJLtakp3kVALeYmsZxbzauH7JxMmiJl",
    "https://www.facebook.com/permalink.php?story_fbid=pfbid0im8Z2Eb48GCgbyPuiy4PVEteHGLRL8F1z64wubeZKYLm5rPkBQQ9gTivAcVV6serl&id=100088412774512",
];
export const ScrollToGetPost = async (cookie: any) => {
    const db = await mongoPromise;
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
    // listSeedPost.map(item=>async ()=>{
    //     const seedPage = await browserContext.newPage();
    //     await seedPage.goto(item);
    //     // await scrollFunc(seedPage, 1000);
    //     // await seedPage.waitForLoadState('load');
    //     // await seedPage.locator("#mount_0_0_4y > div > div:nth-child(1) > div > div.x9f619.x1n2onr6.x1ja2u2z > div > div > div.x78zum5.xdt5ytf.x1t2pt76.x1n2onr6.x1ja2u2z.x10cihs4 > div.x1qjc9v5.x78zum5.xl56j7k.x193iq5w.x1t2pt76 > div > div > div > div > div > div > div > div > div > div > div > div > div > div:nth-child(8) > div > div > div:nth-child(4) > div > div > div.x1pi30zi.x1swvt13.x1n2onr6 > div.x1gslohp > div.x1iyjqo2 > div > div > div > div > div > div > div > div.x1r8uery.x1iyjqo2.x6ikm8r.x10wlt62.x4uap5 > form > div > div > div.xi81zsa.xo1l8bm.xlyipyv.xuxw1ft.x49crj4.x1ed109x.xdl72j9.x1iyjqo2.xs83m0k.x6prxxf.x6ikm8r.x10wlt62.x1y1aw1k.xn6708d.xwib8y2.x1ye3gou > div > div.xzsf02u.x1a2a7pz.x1n2onr6.x14wi4xw.notranslate").scrollIntoViewIfNeeded();
    //     // await seedPage.locator("#mount_0_0_4y > div > div:nth-child(1) > div > div.x9f619.x1n2onr6.x1ja2u2z > div > div > div.x78zum5.xdt5ytf.x1t2pt76.x1n2onr6.x1ja2u2z.x10cihs4 > div.x1qjc9v5.x78zum5.xl56j7k.x193iq5w.x1t2pt76 > div > div > div > div > div > div > div > div > div > div > div > div > div > div:nth-child(8) > div > div > div:nth-child(4) > div > div > div.x1pi30zi.x1swvt13.x1n2onr6 > div.x1gslohp > div.x1iyjqo2 > div > div > div > div > div > div > div > div.x1r8uery.x1iyjqo2.x6ikm8r.x10wlt62.x4uap5 > form > div > div > div.xi81zsa.xo1l8bm.xlyipyv.xuxw1ft.x49crj4.x1ed109x.xdl72j9.x1iyjqo2.xs83m0k.x6prxxf.x6ikm8r.x10wlt62.x1y1aw1k.xn6708d.xwib8y2.x1ye3gou > div > div.xzsf02u.x1a2a7pz.x1n2onr6.x14wi4xw.notranslate").click();
    //     // await seedPage.keyboard.type("Tôi đang có nhu cầu vay tiền , 10 triệu đồng");
    //     await seedPage.close();
    // })
    for (const item of listSeedPost) {
        const seedPage = await browserContext.newPage();
        await seedPage.goto(item);
        await scrollFunc(seedPage, 1000);
        await seedPage.waitForLoadState("load");
        // await seedPage.locator("#mount_0_0_4y > div > div:nth-child(1) > div > div.x9f619.x1n2onr6.x1ja2u2z > div > div > div.x78zum5.xdt5ytf.x1t2pt76.x1n2onr6.x1ja2u2z.x10cihs4 > div.x1qjc9v5.x78zum5.xl56j7k.x193iq5w.x1t2pt76 > div > div > div > div > div > div > div > div > div > div > div > div > div > div:nth-child(8) > div > div > div:nth-child(4) > div > div > div.x1pi30zi.x1swvt13.x1n2onr6 > div.x1gslohp > div.x1iyjqo2 > div > div > div > div > div > div > div > div.x1r8uery.x1iyjqo2.x6ikm8r.x10wlt62.x4uap5 > form > div > div > div.xi81zsa.xo1l8bm.xlyipyv.xuxw1ft.x49crj4.x1ed109x.xdl72j9.x1iyjqo2.xs83m0k.x6prxxf.x6ikm8r.x10wlt62.x1y1aw1k.xn6708d.xwib8y2.x1ye3gou > div > div.xzsf02u.x1a2a7pz.x1n2onr6.x14wi4xw.notranslate").scrollIntoViewIfNeeded();
        // await seedPage.locator("#mount_0_0_4y > div > div:nth-child(1) > div > div.x9f619.x1n2onr6.x1ja2u2z > div > div > div.x78zum5.xdt5ytf.x1t2pt76.x1n2onr6.x1ja2u2z.x10cihs4 > div.x1qjc9v5.x78zum5.xl56j7k.x193iq5w.x1t2pt76 > div > div > div > div > div > div > div > div > div > div > div > div > div > div:nth-child(8) > div > div > div:nth-child(4) > div > div > div.x1pi30zi.x1swvt13.x1n2onr6 > div.x1gslohp > div.x1iyjqo2 > div > div > div > div > div > div > div > div.x1r8uery.x1iyjqo2.x6ikm8r.x10wlt62.x4uap5 > form > div > div > div.xi81zsa.xo1l8bm.xlyipyv.xuxw1ft.x49crj4.x1ed109x.xdl72j9.x1iyjqo2.xs83m0k.x6prxxf.x6ikm8r.x10wlt62.x1y1aw1k.xn6708d.xwib8y2.x1ye3gou > div > div.xzsf02u.x1a2a7pz.x1n2onr6.x14wi4xw.notranslate").click();
        // await seedPage.keyboard.type("Tôi đang có nhu cầu vay tiền , 10 triệu đồng");aw
        // await seedPage.locator(".xi81zsa.x6ikm8r.x10wlt62.x47corl.x10l6tqk.x17qophe.xlyipyv.x13vifvy.x87ps6o.xuxw1ft.xh8yej3").fill('abcd');
        const input = await seedPage.$(".xi81zsa.xo1l8bm.xlyipyv.xuxw1ft.x49crj4.x1ed109x.xdl72j9.x1iyjqo2.xs83m0k.x6prxxf.x6ikm8r.x10wlt62.x1y1aw1k.xn6708d.xwib8y2.x1ye3gou")
        await input.click();
        await seedPage.keyboard.type("Tôi đang có nhu cầu vay tiền , 10 triệu đồng")
        // await seedPage.keyboard.press("Enter")
        await seedPage.waitForTimeout(200000);
        await seedPage.close();
    }
    let foundSponsored: boolean = false;
    function containsKeyword(divText: string | any, keywords: string[]) {
        const lowercasedDivText = divText.toLowerCase();
        return keywords.some((keyword) => lowercasedDivText.includes(keyword.toLowerCase()));
    }
    await page.waitForLoadState("load");
    await page.waitForLoadState("domcontentloaded");
    await page.waitForTimeout(10000);
    // const startTime = Date.now();
    const listLinkSponsored = [
        "https://www.facebook.com/permalink.php?story_fbid=pfbid0XYg939PNkrUpW5ixeErmoRsBDWKPgMgFyeoCQEBc6z1Rzhvjwk3U517fBgz3DYbRl&id=346115832190186",
        "https://www.facebook.com/permalink.php?story_fbid=pfbid0yCSkz697w73WP5qYceR4M8AriVQgFU261NTmFyRdevunvxT1dh2Lv6moPA9Hq3A6l&id=100086326421206",
        "https://www.facebook.com/permalink.php?story_fbid=pfbid03iLCRJtqbVu7qhWM8RgUrcLWkhLg6eBRgxaCdPgUgBFSXjN7KUxeAY1UNdZPp1srl&id=100089445901309",
    ];
    // for (const i of listLinkSponsored) {
    //     const seedPage = await browserContext.newPage();
    //     await seedPage.goto(i);
    //     await seedPage.waitForLoadState("load");
    //     await scrollFunc(page, 1000);
    //     await seedPage.waitForTimeout(120000);
    //     await seedPage.close();
    // }
    scrollFromSearch(cookie)
    while (true) {
        await page.waitForTimeout(5000);
        // if(!foundSponsored && Date.now() - startTime > 3 * 60 * 1000){
        //     await page.reload();
        //     await page.waitForLoadState('load');
        //     await page.waitForTimeout(10000);
        // }
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
                        const namePostElement = await checkAd?.evaluate(el => el?.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector(".xu06os2.x1ok221b h4 span a"));
                        const namePost = namePostElement ?  namePostElement.textContent : '';
                    
                        const likeElement = await checkAd?.evaluate(el => el?.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector("span.xt0b8zv.x1e558r4"));
                        const like = likeElement ?  likeElement.textContent : '';
                    
                        const commentElement = await checkAd?.evaluate(el => el?.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector(".x9f619.x1n2onr6.x1ja2u2z.x78zum5.xdt5ytf.x2lah0s.x193iq5w.xeuugli.xg83lxy.x1h0ha7o.x10b6aqq.x1yrsyyn"));
                        const comment = commentElement ?  commentElement.textContent : '';
                        const actuallyUrl = parseFacebookIframeSrc(linkRaw);
                        const existingPost  =await db.trashPost.findOne({url:actuallyUrl})
                        if (existingPost) {
                            console.error("URL already exists in the database");
                            return existingPost;
                        }
                        const postData = LinkPostDto.createObj({ namePost,like,comment, url: actuallyUrl, rawUrl: linkRaw });
                    
                        await db.linkPost.insertOne({ ...postData, _id: new ObjectId() });
                    }
                    
                    await page.waitForTimeout(60000);
                    await page.keyboard.press("Escape");
                    await page.waitForLoadState("load");
                    await page.waitForLoadState("domcontentloaded");
                    await page.waitForTimeout(5000);
                    // const comment = await checkAd.evaluateHandle((item) => {
                    //     const parentElement =
                    //         item.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement
                    //             .parentElement;
                    //     const elementWithText = Array.from(parentElement.getElementsByTagName("div")).find((element) =>
                    //         element.textContent.includes("Bình luận")
                    //     );
                    //     return elementWithText;
                    // });
                    // await comment.click();
                    // console.log("cmt click");
                    // await page.keyboard.type(".    ib", { delay: 1000 });
                    // await page.keyboard.press("Enter");
                    // await page.waitForLoadState("load");
                    // await page.waitForLoadState("domcontentloaded");
                    // await page.waitForTimeout(Math.ceil(Math.random() * 20) * 1000);
                    // await page
                    //     .locator(
                    //         "span.x193iq5w.xeuugli.x13faqbe.x1vvkbs.x1xmvt09.x1lliihq.x1s928wv.xhkezso.x1gmr53x.x1cpjm7i.x1fgarty.x1943h6x.xudqn12.x3x7a5m.x6prxxf.xvq8zen.x1s688f.xi81zsa:has-text('Phù hợp nhất')"
                    //     )
                    //     .click();
                    // await page.waitForLoadState("load");
                    // await page.waitForLoadState("domcontentloaded");
                    // await page.waitForTimeout(Math.ceil(Math.random() * 20) * 1000);
                    // await page
                    //     .locator(
                    //         "span.x193iq5w.xeuugli.x13faqbe.x1vvkbs.x1xmvt09.x1lliihq.x1s928wv.xhkezso.x1gmr53x.x1cpjm7i.x1fgarty.x1943h6x.xudqn12.x3x7a5m.x6prxxf.xvq8zen.xk50ysn.xzsf02u.x1yc453h:has-text('Mới nhất')"
                    //     )
                    //     .click();
                    // await page.waitForLoadState("load");
                    // await page.waitForLoadState("domcontentloaded");
                    // await page.waitForTimeout(Math.ceil(Math.random() * 20) * 1000);
                    // await page
                    //     .locator(
                    //         "span.x193iq5w.xeuugli.x13faqbe.x1vvkbs.x1xmvt09.x1lliihq.x1s928wv.xhkezso.x1gmr53x.x1cpjm7i.x1fgarty.x1943h6x.xudqn12.x3x7a5m.x6prxxf.xvq8zen.x1s688f.xi81zsa:has-text('Mới nhất')"
                    //     )
                    //     .click();
                    // await page
                    //     .locator(
                    //         "span.x193iq5w.xeuugli.x13faqbe.x1vvkbs.x1xmvt09.x1lliihq.x1s928wv.xhkezso.x1gmr53x.x1cpjm7i.x1fgarty.x1943h6x.xudqn12.x3x7a5m.x6prxxf.xvq8zen.x1s688f.xi81zsa:has-text('Mới nhất')"
                    //     )
                    //     .click();
                    // try {
                    //     for (let i = 0; i < 3; i++) {
                    //         for (let j = 0; j < 100; j++) {
                    //             await page.keyboard.press("ArrowDown");
                    //             await page.waitForTimeout(1000);
                    //         }
                    //         // const elements = await page.$$(
                    //         //     ".x1i10hfl.xjbqb8w.xjqpnuy.xa49m3k.xqeqjp1.x2hbi6w.x13fuv20.xu3j5b3.x1q0q8m5.x26u7qi.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x1ypdohk.xdl72j9.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.x2lwn1j.xeuugli.xexx8yu.x18d9i69.xkhd6sd.x1n2onr6.x16tdsg8.x1hl2dhg.xggy1nq.x1ja2u2z.x1t137rt.x1o1ewxj.x3x9cwd.x1e5q0jg.x13rtm0m.x3nfvp2.x1q0g3np.x87ps6o.x1a2a7pz.x6s0dn4.xi81zsa.x1iyjqo2.xs83m0k.xsyo7zv.xt0b8zv span.x78zum5.x1w0mnb.xeuugli span.x78zum5.x1w0mnb.xeuugli:has-text('Xem thêm bình luận')"
                    //         // );

                    //         // let elementInView = null;

                    //         // for (const element of elements) {
                    //         //     const boundingBox = await element.boundingBox();
                    //         //     if (
                    //         //         boundingBox &&
                    //         //         boundingBox.x >= 0 &&
                    //         //         boundingBox.y >= 0 &&
                    //         //         boundingBox.x + boundingBox.width <= page.viewportSize().width &&
                    //         //         boundingBox.y + boundingBox.height <= page.viewportSize().height
                    //         //     ) {
                    //         //         elementInView = element;
                    //         //         break;
                    //         //     }
                    //         // }

                    //         // if (elementInView) {
                    //         //     console.log("click to load more cmt");
                    //         //     await elementInView.scrollIntoViewIfNeeded();
                    //         //     await elementInView.click();
                    //         //     await page.waitForLoadState("load");
                    //         //     await page.waitForLoadState("domcontentloaded");
                    //         //     await page.waitForTimeout(Math.ceil(Math.random() * 20) * 1000);
                    //         // } else {
                    //         //     console.log("No element is currently in the view of the screen");
                    //         //     break;
                    //         // }
                    //     }
                    // } catch (error) {
                    //     console.log(error);
                    // }
                    // const listCmt = await page.$$(".x169t7cy.x19f6ikt");
                    // for (const singleCmt of listCmt) {
                    //     await page.waitForTimeout(Math.ceil(Math.random() * 20) * 1000 + 10000);
                    //     const randomNum = Math.ceil(Math.random() * 3);
                    //     switch (randomNum) {
                    //         case 0:
                    //             const linkProfile = await singleCmt.$(".x1y1aw1k.xn6708d.xwib8y2.x1ye3gou .xt0psk2 a");
                    //             await linkProfile.scrollIntoViewIfNeeded();
                    //             await linkProfile.click({ modifiers: ["Control"] });
                    //             await page.keyboard.up("Control");
                    //             const newTab = await browserContext.waitForEvent("page");
                    //             await newTab.bringToFront();
                    //             await newTab.waitForTimeout(Math.ceil(Math.random() * 10) * 1000);
                    //             await newTab.locator("span.x1lliihq.x6ikm8r.x10wlt62.x1n2onr6.xlyipyv.xuxw1ft:has-text('Thêm bạn bè')").click();
                    //             await newTab.waitForTimeout(Math.ceil(Math.random() * 20) * 1000 + 10000);
                    //             await newTab.close();
                    //             break;
                    //         case 1:
                    //             const linkProfile3 = await singleCmt.$(".x1y1aw1k.xn6708d.xwib8y2.x1ye3gou .xt0psk2 a");
                    //             await linkProfile3.scrollIntoViewIfNeeded();
                    //             await linkProfile3.click({ modifiers: ["Control"] });
                    //             await page.keyboard.up("Control");
                    //             const newTab3 = await browserContext.waitForEvent("page");
                    //             await newTab3.bringToFront();
                    //             await newTab3.waitForTimeout(Math.ceil(Math.random() * 10) * 1000);
                    //             await newTab3.locator("span.x1lliihq.x6ikm8r.x10wlt62.x1n2onr6.xlyipyv.xuxw1ft:has-text('Nhắn tin')").click();
                    //             await newTab3.keyboard.type(".    Xin chào", { delay: 1000 });
                    //             await newTab3.waitForTimeout(Math.ceil(Math.random() * 20) * 1000 + 10000);
                    //             await newTab3.close();
                    //             break;
                    //         case 2:
                    //             const linkProfile2 = await singleCmt.$(".x1y1aw1k.xn6708d.xwib8y2.x1ye3gou .xt0psk2 a");
                    //             await linkProfile2.scrollIntoViewIfNeeded();
                    //             await linkProfile2.click({ modifiers: ["Control"] });
                    //             await page.keyboard.up("Control");
                    //             const newTab2 = await browserContext.waitForEvent("page");
                    //             await newTab2.bringToFront();
                    //             await newTab2.waitForTimeout(Math.ceil(Math.random() * 10) * 1000);
                    //             await scrollFunc(page, 1000);
                    //             const cmtProfile = await newTab.$(
                    //                 "span.x193iq5w.xeuugli.x13faqbe.x1vvkbs.x1xmvt09.x1lliihq.x1s928wv.xhkezso.x1gmr53x.x1cpjm7i.x1fgarty.x1943h6x.xudqn12.x3x7a5m.x6prxxf.xvq8zen.x1s688f.xi81zsa:has-text('Bình luận')"
                    //             );
                    //             await cmtProfile.click();
                    //             // await newTab2
                    //             //     .locator(
                    //             //         "span.x193iq5w.xeuugli.x13faqbe.x1vvkbs.x1xmvt09.x1lliihq.x1s928wv.xhkezso.x1gmr53x.x1cpjm7i.x1fgarty.x1943h6x.xudqn12.x3x7a5m.x6prxxf.xvq8zen.x1s688f.xi81zsa:has-text('Bình luận')"
                    //             //     )
                    //             //     .click();
                    //             await newTab2.keyboard.type("    xin chào ", { delay: 1000 });
                    //             await newTab2.waitForTimeout(Math.ceil(Math.random() * 20) * 1000 + 10000);
                    //             await newTab2.close();
                    //             break;
                    //         case 3:
                    //             const likeCmt = await singleCmt.$(
                    //                 ".x1i10hfl.xjbqb8w.xjqpnuy.xa49m3k.xqeqjp1.x2hbi6w.x13fuv20.xu3j5b3.x1q0q8m5.x26u7qi.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x1ypdohk.xdl72j9.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.x2lwn1j.xeuugli.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1n2onr6.x16tdsg8.x1hl2dhg.x1ja2u2z.x1t137rt.x1o1ewxj.x3x9cwd.x1e5q0jg.x13rtm0m.x1q0g3np.x87ps6o.x1lku1pv.x1a2a7pz.x6s0dn4.x78zum5.x1iyjqo2.x2lah0s.xl56j7k.x5ve5x3 .xi81zsa.x1ypdohk.x1rg5ohu.x117nqv4.x1n2onr6.xt0b8zv"
                    //             );
                    //             await likeCmt.click();
                    //             await page.waitForTimeout(Math.ceil(Math.random() * 20) * 1000 + 10000);
                    //         default:
                    //             break;
                    //     }
                    // }
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
};
// ScrollToGetPost("")
