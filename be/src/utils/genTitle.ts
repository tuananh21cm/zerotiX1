

export function generateTitles(
    keywords: string[], 
    phrases: string[], 
    amount: number, 
    optionalKeys: string = "", 
    minLength: number = 50, 
    maxLength: number = 100
  ): string[] {
    const titles: string[] = [];
  
    // Clean up optionalKeys to ensure there's only one space between words
    const cleanOptionalKeys = optionalKeys.trim().replace(/\s+/g, ' ');
  
    // Loop through for the given amount of times to generate the required number of titles
    for (let i = 0; i < amount; i++) {
      // Loop through keywords in sequence
      keywords.forEach((keyword) => {
        // Construct title ensuring only one space if optionalKeys is provided
        let title = `${keyword}${cleanOptionalKeys ? ' ' + cleanOptionalKeys : ''} T-Shirt`.trim();
        let totalLength = title.length;
  
        // Keep adding random phrases until the title exceeds the minLength
        while (totalLength < minLength) {
          const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)].replace("\r","").trim();
          title += ` ${randomPhrase}`;
          totalLength = title.length;
        }
  
        // Ensure the title doesn't exceed the maxLength
        if (totalLength <= maxLength) {
          titles.push(title);
        }
      });
    }
  
    return titles;
  }
  
