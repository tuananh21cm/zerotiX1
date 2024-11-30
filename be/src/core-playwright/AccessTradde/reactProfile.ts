
import { chromium } from "playwright-core";
import { configCookie } from "../../utils/configCookie";

export const reactProfile = async()=>{

    const browser = await chromium.launch({
        headless: false
    });
    // const listSensitive = ["zalo","http",".com"];
    function containsKeyword(divText:string|any, keywords:any) {
      const lowercasedDivText = divText.toLowerCase();
      return keywords.some((keyword:any) => lowercasedDivText.includes(keyword.toLowerCase()));
    }
    const browserContext = await browser.newContext();
    const cookies =configCookie({"url":"https://www.facebook.com","cookies":[{"domain":".facebook.com","expirationDate":1736411860.174616,"hostOnly":false,"httpOnly":true,"name":"sb","path":"/","sameSite":"no_restriction","secure":true,"session":false,"storeId":"0","value":"D_YQZUNNsbCwp2CQRXHbLdQc"},{"domain":".facebook.com","expirationDate":1735961079.547888,"hostOnly":false,"httpOnly":true,"name":"datr","path":"/","sameSite":"no_restriction","secure":true,"session":false,"storeId":"0","value":"HgdSZc3c1SIYCRd5etNN1d6e"},{"domain":".facebook.com","expirationDate":1702456652,"hostOnly":false,"httpOnly":false,"name":"wd","path":"/","sameSite":"lax","secure":true,"session":false,"storeId":"0","value":"1057x831"},{"domain":".www.facebook.com","expirationDate":1736411851,"hostOnly":false,"httpOnly":false,"name":"m_ls","path":"/","sameSite":"no_restriction","secure":true,"session":false,"storeId":"0","value":"%7B%22c%22%3A%7B%221%22%3A%22HDwWARYBAAAWARYBEwUWnJWV_Li9LQA%22%2C%222%22%3A%22GSwVQBxMAAAWARa6y4DXDBYAABV-HEwAABYAFrrLgNcMFgAAFigA%22%2C%2295%22%3A%22HDwWARYBAAAWARYBEwUWnJWV_Li9LQA%22%7D%2C%22d%22%3A%22c0449f79-f728-4b45-98e8-4a8ee03020ff%22%2C%22s%22%3A%220%22%2C%22u%22%3A%22ej8cyt%22%7D"},{"domain":".facebook.com","expirationDate":1702456658,"hostOnly":false,"httpOnly":false,"name":"dpr","path":"/","sameSite":"no_restriction","secure":true,"session":false,"storeId":"0","value":"0.8999999761581421"},{"domain":".facebook.com","expirationDate":1733387860.174691,"hostOnly":false,"httpOnly":false,"name":"c_user","path":"/","sameSite":"no_restriction","secure":true,"session":false,"storeId":"0","value":"100042782445854"},{"domain":".facebook.com","expirationDate":1733387860.174708,"hostOnly":false,"httpOnly":true,"name":"xs","path":"/","sameSite":"no_restriction","secure":true,"session":false,"storeId":"0","value":"20%3AZUBRdSQqNhddNw%3A2%3A1701851857%3A-1%3A6156"},{"domain":".facebook.com","expirationDate":1709627860.485119,"hostOnly":false,"httpOnly":true,"name":"fr","path":"/","sameSite":"no_restriction","secure":true,"session":false,"storeId":"0","value":"1fRT6xZKpgTtfINSX.AWVgWEtvhd85WEmn3cd_Lrb4TuA.BlbYxC.TU.AAA.0.0.BlcDLS.AWWtbe81j_w"}]});
    await browserContext.addCookies(cookies);
    const page = await browserContext.newPage();
    await page.waitForLoadState('load');
    await page.waitForTimeout(5000);
    const listLink=["https://www.facebook.com/100083643490809/posts/pfbid033HBgTfr79yUJPXLxKtRE6ij7fPZD7BsMKJ1R8ojnX4YcwtsSKaui9FTZEU1Fasjil/?mibextid=UyTHkb","https://www.facebook.com/100090892909836/posts/pfbid02ySHcA2S6MTAJGUgpLe6GCHdyDEnn1hmdjp3bXndV7ssdZWTbp3bPBQhAoXL65a77l/?mibextid=UyTHkb","https://www.facebook.com/61552518217318/posts/pfbid0LAoTA3cqVUzHwncnL78wwU3LZrbWKj5FA3x3ZoCuuFDbb7xCmwJY448KBTYa2x2Al/?mibextid=UyTHkb","https://www.facebook.com/100084148902878/videos/2071691286514769/?extid=CL-UNK-UNK-UNK-AN_GK0T-GK1C&ref=sharing&mibextid=UyTHkb"];
    for(const itemLink of listLink){
      await page.goto(itemLink.replace("https://www.facebook.com/","https://mbasic.facebook.com/"));
      while(true){
        await page.waitForTimeout(Math.ceil(Math.random()*20)*1000+10000);
        await page.waitForLoadState('load');
        await page.waitForLoadState("domcontentloaded");
        const amountCMT = await page.$$('#m_story_permalink_view div:nth-child(2) div div:nth-child(5) div a:has-text("Bày tỏ cảm xúc"):not(.selected)') ;
        for(let i=0;i<amountCMT.length;i++){ 
          await page.waitForLoadState('load') ;
          await page.waitForLoadState("domcontentloaded"); 
          await page.waitForTimeout(Math.ceil(Math.random()*20)*10000+10000); 
          const reactions= await page.$('#m_story_permalink_view div:nth-child(2) div div:nth-child(5) div a:has-text("Bày tỏ cảm xúc"):not(.selected)'); 
          const content = await reactions?.evaluate(i=>i?.parentElement?.textContent);
          await page.evaluate(element => { 
            element?.classList.add('selected'); 
          }, reactions); 
          
          if(containsKeyword(content,reactions)){
            continue;
          }
          await reactions?.scrollIntoViewIfNeeded(); 
          await reactions?.click({ modifiers: ["Control"] });  
          await page.keyboard.up("Control"); 
          const newTab = await browserContext.waitForEvent("page"); 
          await newTab.bringToFront();  
          await newTab.waitForTimeout(Math.ceil(Math.random()*20)*1000+10000);  
          const listReaction = await newTab.$$("#objects_container .r .v>.w");  
          await listReaction[Math.ceil(Math.random()*6)].click();  
          await newTab.waitForTimeout(Math.ceil(Math.random()*20)*1000+5000);  
          await newTab.close(); 
          await page.waitForTimeout(Math.ceil(Math.random()*20)*1000); 
        } 
        try { 
          const moreContent = await page.$("#m_story_permalink_view div:nth-child(2) div div:nth-child(5) div a:has-text('Xem thêm bình luận')"); 
          await moreContent?.click();  
        } catch (error) { 
          console.log('end of result');
          console.log(error) ;
          break; 
        }
      }
    }
};
