import { chromium } from "playwright-core";
import { v4 as uuidv4 } from "uuid";
import fs from 'fs';
import { configCookie } from "../../utils/configCookie";
import { scrollFunc } from "../../utils/scrollFunc";

interface IPost {
  id: any;
  content: string;
  likeAmount: number;
  commentAmount: number;
  url:string
}
const listDataCrawl:IPost[] = [];
export const crawwlPost = async (listPost:string[])=>{
  try {
    const cookie = await configCookie("trantuananh");
    const browser = await chromium.launch({
      headless: false, 
    });
    const browserContext = await browser.newContext();
    await browserContext.addCookies(cookie); 
    const CHUNK_COURSE_SIZE = 2;
    const tChunks = Math.ceil(listPost?.length / CHUNK_COURSE_SIZE);

    for (let i = 0; i < tChunks; i++) {
      const s = i * CHUNK_COURSE_SIZE;
      const e = (i + 1) * CHUNK_COURSE_SIZE;
      const c = listPost.slice(s, e);

      const jobPromises = c.map(async (url) => {
        const jobPage = await browserContext.newPage();
        try {
          let hasPost = true;
          await jobPage.goto(url, {
            timeout: 60000,
          });
          await jobPage.waitForLoadState("load");
          await jobPage.waitForLoadState("domcontentloaded");
          await jobPage.waitForTimeout(6000);
          await jobPage.click(".x1s688f.xi81zsa .x1j85h84");
          await jobPage.waitForLoadState("load");
          await jobPage.waitForLoadState("domcontentloaded");
          await jobPage.waitForTimeout(4000);
          await jobPage.click(".x1i10hfl.xjbqb8w.x1ejq31n.xd10rxx.x1sy0etr.x17r0tee.x972fbf.xcfux6l.x1qhh985.xm0m39n.xe8uvvx.x1hl2dhg.xggy1nq.x1o1ewxj.x3x9cwd.x1e5q0jg.x13rtm0m.x87ps6o.x1lku1pv.x1a2a7pz.x6s0dn4.xjyslct.x9f619.x1ypdohk.x78zum5.x1q0g3np.x2lah0s.x1i6fsjq.xfvfia3.xnqzcj9.x1gh759c.x10wwi4t.x1x7e7qh.x1344otq.x1de53dj.x1n2onr6.x16tdsg8.x1ja2u2z:has-text('Bài viết mới')");
          await jobPage.waitForLoadState("load");
          await jobPage.waitForLoadState("domcontentloaded");
          await jobPage.waitForTimeout(3000);
          while (hasPost) {
            const feed = await jobPage.$(
              `div[role="feed"] .x1yztbdb.x1n2onr6.xh8yej3.x1ja2u2z:not(.selected)`
            ) ;
            const content = await feed.$eval(
              '.html-div.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd .xdj266r.x11i5rnm.xat24cr.x1mh8g0r.x1vvkbs.x126k92a',
              (el) => el.textContent
            );

            // const likeAmountEle = await feed.$eval(
            //   ".xl423tq .x1e558r4",
            //   (el) => el.textContent
            // );
            // const numberMatch = likeAmountEle.match(/\d+/);
            // const likeAmount = numberMatch ? parseInt(numberMatch[0], 10) : null;
            // const commentAmountEle = await feed.$eval(
            //   ".x1hl2dhg .xvq8zen.xo1l8bm:has-text('bình luận')",
            //   (el) => el.textContent
            // );
            // const numberMatchComment = commentAmountEle.match(/\d+/);
            // const commentAmount = numberMatchComment ? parseInt(numberMatchComment[0], 10) : null;
            const likeAmount =0;
            const commentAmount=0;
            const urlEle = await feed.$('span.html-span.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1hl2dhg.x16tdsg8.x1vvkbs a[role="link"]');
            await urlEle.hover();
            await jobPage.waitForTimeout(3000);
            const url = await urlEle.getAttribute('href');
            console.log({url});
            console.log({content});
            listDataCrawl.push({
              id:uuidv4(),
              url,
              content,
              likeAmount,
              commentAmount
            });
            await scrollFunc(jobPage);
            await jobPage.evaluate((element) => {
              element?.classList.add("selected");
            }, feed);
            await jobPage.waitForTimeout(5000);
          }

          // Process page content if needed
        } catch (error) {
          console.error(`Error processing URL ${url}:`, error);
        } finally {
          fs.writeFile('data1.json', JSON.stringify(listPost), (err) => {
            if (err) {
              console.error('Error writing file:', err);
              return;
            }
            console.log('File written successfully');
          });
            // await jobPage.close();
        }
      });

      await Promise.all(jobPromises);
    }
  } catch (error) {
    console.error("Error in httpTrigger:", error);
  }
};

