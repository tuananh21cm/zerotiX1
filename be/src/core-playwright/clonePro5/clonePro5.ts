import { chromium } from "playwright-core";
import fs from "fs/promises";

interface IData {
  profileName: string;
  title: string;
  imgUrl: string;
  dsUrl: string;
}

// Enhanced saveDataToJson function
const saveDataToJson = async (listProfile: { name: string; image: string }[], filePath: string) => {
    try {
      // Generate count data to manage duplicates while preserving image links
      const countMap: Record<string, { amount: number; image: string }> = {};
  
      listProfile.forEach(({ name, image }) => {
        if (name) {
          if (countMap[name]) {
            countMap[name].amount += 1; // Increment count if name already exists
          } else {
            countMap[name] = { amount: 1, image }; // Initialize with count and image
          }
        }
      });
  
      // Create an array of objects with title, amount, and image
      const processedData = Object.entries(countMap).map(([title, { amount, image }]) => ({
        title,
        amount,
        image,
      }));
  
      // Save to JSON file
      const jsonData = JSON.stringify(processedData, null, 2); // Beautify JSON with 2-space indentation
      await fs.writeFile(filePath, jsonData, "utf-8");
      console.log(`Data successfully saved to ${filePath}`);
      return processedData; // Return the processed data
    } catch (error) {
      console.error("Error saving data to JSON file:", error);
      throw error;
    }
  };
  

  export const clonePro5 = async () => {
    let listProfile: { name: string; image: string }[] = [];
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
      await jobPage.fill("input#email", "tuananh@kbt.global");
      await jobPage.fill("input#password", "Ubu6DQp0WyAkdaj");
      await jobPage.click("button.btn.btn-primary:has-text('Login')");
      await jobPage.waitForLoadState("load");
      await jobPage.waitForTimeout(5000);
  
      const pro5 = "TTDP-17";
      await jobPage.goto(
        `https://system.kbt.global/admin/orders/index2?datefilter=01-01-2023+-+31-12-2024&page_count=500&keyword=${pro5}&show_search=&type=0&seller_id=0&product_type=-1&order_status=3&design_status=0&label_status=0&printer_status=19&product_overview=0&tracking_updated=0&delivered_overview=0&designer_assignee=0&fulfiller_id=0&supplier=99999`,
        { timeout: 0 }
      );
      await jobPage.waitForLoadState("load");
      await jobPage.waitForTimeout(6000);
  
      listProfile = await jobPage.$$eval(
        ".product_info.row",
        (els: HTMLElement[]) =>
          els.map((el) => {
            const nameElement = el.querySelector(".col-md-10 a");
            const imageElement = el.querySelector(".image-wrapper.col-md-3 a");
  
            return {
              name: nameElement?.textContent?.trim() || "",
              image: imageElement?.getAttribute("href") || "",
            };
          })
      );
  
      console.log("Raw Profile Data:", listProfile);
  
      // Save processed data to JSON file
      const processedData = await saveDataToJson(listProfile, "./output2.json");
      console.log("Processed Data:", processedData);
    } catch (error) {
      console.error("Error in clonePro5:", error);
    } finally {
      await browserContext.close();
      await browser.close();
    }
  };
  
