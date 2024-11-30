import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';

const dateList = "0310";
const originalImages = ["TA-0310-061.png", "TA-0310-062.png", "TA-0310-063.png", "TA-0310-064.png", "TA-0310-065.png"];
const numVariations = 20; // Number of variations per image
const basePath = "C:/listing/sneaker/0310";

// Function to calculate MD5 hash of an image
const calculateMD5 = (filePath: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const hash = crypto.createHash('md5');
        const stream = fs.createReadStream(filePath);
        stream.on('data', (data) => hash.update(data));
        stream.on('end', () => resolve(hash.digest('hex')));
        stream.on('error', reject);
    });
};

// Generate images
const genImg = async function (): Promise<void> {
    try {
        for (const originalImage of originalImages) {
            const inputPath = path.join(basePath, originalImage);
            
            // Get the base order (e.g., 61 from TA-0310-061.png)
            const baseOrder = getOrder(originalImage);

            for (let i = 1; i <= numVariations; i++) {
                const newOrder = baseOrder + (i * 5);  // Increment the order by 5 for each variation
                const outputFileName = `TA-${dateList}-${String(newOrder).padStart(3, '0')}.png`;
                const outputPath = path.join(basePath, outputFileName);
                const overlayText = `${i}`;

                // Add a small noise buffer (not visible) to ensure different MD5 hash
                const noise = Buffer.alloc(8, Math.random() * 255); // Small random noise

                const imageBuffer = await sharp(inputPath)
                    .composite([{
                        input: Buffer.from(`
                            <svg>
                                <text x="10" y="20" font-size="10" fill="rgba(255, 255, 255, 0.01)">${overlayText}</text>
                            </svg>
                        `),
                        gravity: 'southwest'
                    }])
                    .modulate({
                        brightness: 1.01 + Math.random() * 0.001, // Very subtle random adjustment
                        saturation: 1.01 + Math.random() * 0.001
                    })
                    .toBuffer(); // Get the buffer

                // Combine image buffer with small noise for unique hash
                fs.writeFileSync(outputPath, Buffer.concat([imageBuffer, noise]));

                const md5Hash = await calculateMD5(outputPath);
                console.log(`Image ${outputFileName} created with MD5: ${md5Hash}`);
            }
        }
    } catch (error) {
        console.error("Error:", error);
    }
};

// Extract the numerical order from the file name
const getOrder = (inputFileName: string): number => {
    const arraySlice = inputFileName.split("-");
    const fileName = arraySlice[arraySlice.length - 1].split(".");
    return Number(fileName[0]);
};

export default genImg;
