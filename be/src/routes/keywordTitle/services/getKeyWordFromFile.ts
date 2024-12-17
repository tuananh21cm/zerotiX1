import fs from 'fs/promises';
import 'dotenv/config'
const filePathKey = process.env.filePathKeys;

export const getKeyWordFromFile = async (seller: string,niche:string): Promise<any> => {
  try {
    const filePath = `${filePathKey}/${seller}/keys2.json`;
    console.log({filePath})
    // Read the file content
    const fileContent = await fs.readFile(filePath, 'utf-8');
    
    // Split the content by new lines and filter out empty lines
    const keywords = JSON.parse(fileContent).data.find((item:any) => item.niche === niche);
    //   .split('\n') // Split by newline
    //   .map((line) => line.trim()) // Trim whitespace
    //   .filter((line) => line.length > 0); // Remove empty lines
    // console.log(JSON.parse(fileContent))
    return keywords
  } catch (error) {
    console.error('Error reading file:', error);
    throw new Error(`Failed to read the file`);
  }
};
