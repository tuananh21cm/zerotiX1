export const scrollFunc = async (page: any,scrollHeight:number=1500,scrollDistance: number = 100, scrollDelay: number = 500) => {
    try {
      let currentScroll = 0;
      console.log("Load more by scrolling to the bottom.");
      while (currentScroll < scrollHeight) {
          
          await page.evaluate((distance: number) => {
              window.scrollBy(0, distance);
            }, scrollDistance);
            
            currentScroll += scrollDistance;
            await page.waitForTimeout(scrollDelay);
        }
    } catch (error) {
        console.error("An error occurred while scrolling:", error);
    }
  };