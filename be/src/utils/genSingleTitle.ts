export function generateSingleTitle(
    keyword: string, 
    phrases: string[], 
    optionalKeys: string = "", 
    minLength: number = 50, 
    maxLength: number = 100
  ): string {
    // Clean up optionalKeys to ensure there's only one space between words
    const cleanOptionalKeys = optionalKeys.trim().replace(/\s+/g, ' ');
  
    // Initialize the title with the keyword, optional keys, and "T-Shirt" text
    let title = `${keyword}${cleanOptionalKeys ? ' ' + cleanOptionalKeys : ''} T-Shirt`.trim();
    let totalLength = title.length;
  
    // Keep adding random phrases until the title meets the minimum length
    while (totalLength < minLength) {
      const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)].replace("\r", "").trim();
      // Check if adding the phrase would exceed maxLength
      if (totalLength + randomPhrase.length + 1 > maxLength) break;
      title += ` ${randomPhrase}`;
      totalLength = title.length;
    }
  
    return title;
  }
  