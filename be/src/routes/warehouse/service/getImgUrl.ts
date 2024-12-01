const fs = require("fs");
const path = require("path");

// Function to get image URLs
export const getImageUrls = (folderPath:string) => {
  try {
    const files = fs.readdirSync(folderPath);  
    return files;
  } catch (error) {
    console.error("Error reading image folder:", error);
    return [];
  }
};

