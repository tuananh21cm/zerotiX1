import fs from 'fs/promises';

export const getKeyWordFromFile = async (filePath: string): Promise<string[]> => {
  try {
    // Read the file content
    const fileContent = await fs.readFile(filePath, 'utf-8');

    // Split the content by new lines and filter out empty lines
    const keywords = fileContent
      .split('\n') // Split by newline
      .map((line) => line.trim()) // Trim whitespace
      .filter((line) => line.length > 0); // Remove empty lines

    return keywords;
  } catch (error) {
    console.error('Error reading file:', error);
    throw new Error(`Failed to read the file: ${filePath}`);
  }
};
