import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Function to ensure the output directory exists
const ensureDirectory = (dir: string): void => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

// Function to resize and compress a single image while ensuring it does not exceed a maximum size (in bytes)
export const processImage = async (
    inputPath: string,
    outputPath: string,
    width: number,
    height: number,
    quality: number,
    maxSizeBytes: number
): Promise<void> => {
    let currentQuality = quality;

    try {
        let buffer = await sharp(inputPath)
            .resize(width, height, {
                fit: 'inside', // Maintains aspect ratio
            })
            .jpeg({ quality: currentQuality }) // Adjust compression quality
            .toBuffer();

        // Check if the file size exceeds the max size
        while (buffer.length > maxSizeBytes && currentQuality > 10) {
            console.log(`File size ${buffer.length / 1024 / 1024} MB exceeds 5 MB. Reducing quality...`);
            currentQuality -= 5; // Reduce quality iteratively
            buffer = await sharp(inputPath)
                .resize(width, height, { fit: 'inside' })
                .jpeg({ quality: currentQuality })
                .toBuffer();
        }

        // Save the final processed image
        fs.writeFileSync(outputPath, buffer);
        console.log(
            `Processed: ${outputPath} | Size: ${(buffer.length / 1024 / 1024).toFixed(2)} MB | Quality: ${currentQuality}`
        );
    } catch (error:any) {
        console.error(`Failed to process ${inputPath}: ${error.message}`);
    }
};

// Function to process all images in a directory
export const processImagesInDirectory = async (
    inputDir: string,
    outputDir: string,
    width: number,
    height: number,
    quality: number,
    maxSizeBytes: number
): Promise<void> => {
    try {
        // Ensure the output directory exists
        ensureDirectory(outputDir);

        // Read all files in the input directory
        const files = fs.readdirSync(inputDir);

        for (const file of files) {
            const inputPath = path.join(inputDir, file);
            const outputPath = path.join(outputDir, file);

            // Check if the file is an image
            if (/\.(jpg|jpeg|png|webp|tiff|gif)$/i.test(file)) {
                await processImage(inputPath, outputPath, width, height, quality, maxSizeBytes);
            } else {
                console.log(`Skipped (not an image): ${file}`);
            }
        }
    } catch (error:any) {
        console.error(`Failed to process directory: ${error.message}`);
    }
};

