import axios from 'axios';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import sanitize from 'sanitize-filename';
import pLimit from 'p-limit';
import { chromium } from 'playwright';

const imgExt = ['jpg', 'png', 'jpeg', 'gif', 'bmp', 'tif', 'tiff', 'webp', 'svg'];

// Utility to ensure a directory exists
const ensureDirectory = (dir: string): void => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

// Utility to compute MD5 hash of a buffer
const computeMD5 = (buffer: Buffer): string => {
    return crypto.createHash('md5').update(buffer).digest('hex');
};

// Utility to log messages with timestamps
const log = (level: 'INFO' | 'ERROR', message: string): void => {
    console.log(`[${new Date().toISOString()}] [${level}] ${message}`);
};

// Function to save Base64 images
const saveBase64Image = (
    base64: string,
    directory: string,
    alt: string,
    seenHashes: Set<string>
): void => {
    const match = base64.match(/^data:image\/(.*?);base64,(.+)$/);
    if (!match) {
        log('ERROR', `Invalid Base64 image format: ${base64.slice(0, 30)}...`);
        return;
    }

    const ext = match[1];
    const data = match[2];
    const buffer = Buffer.from(data, 'base64');
    const md5Hash = computeMD5(buffer);

    if (seenHashes.has(md5Hash)) {
        log('INFO', `Duplicate Base64 image detected (MD5: ${md5Hash}), skipping.`);
        return;
    }

    seenHashes.add(md5Hash);
    const sanitizedAlt = sanitize(alt).replace(/[^a-zA-Z0-9-_]/g, '_');
    const localPath = path.join(directory, `${sanitizedAlt}.${ext}`);
    fs.writeFileSync(localPath, buffer);
    log('INFO', `Saved Base64 image: ${localPath}`);
};

// Function to download regular images with MD5 check
const downloadImageWithMD5 = async (
    url: string,
    directory: string,
    seenHashes: Set<string>,
    alt: string
): Promise<void> => {
    try {
        const response = await axios({
            url,
            method: 'GET',
            responseType: 'arraybuffer',
            headers: { 'User-Agent': 'Mozilla/5.0' },
        });

        const ext = response.headers['content-type']?.split('/')[1];
        if (ext && imgExt.includes(ext)) {
            const buffer = Buffer.from(response.data);
            const md5Hash = computeMD5(buffer);

            if (seenHashes.has(md5Hash)) {
                log('INFO', `Duplicate image detected (MD5: ${md5Hash}), skipping.`);
                return;
            }

            seenHashes.add(md5Hash);
            const localPath = path.join(directory, `${alt}.${ext}`);
            fs.writeFileSync(localPath, buffer);
            log('INFO', `Saved image: ${localPath}`);
        } else {
            log('ERROR', `Invalid image extension for URL: ${url}`);
        }
    } catch (error) {
        log('ERROR', `Failed to download image from ${url}: ${error}`);
    }
};

// Function to extract images using Puppeteer, including Base64
const fetchImagesWithPuppeteer = async (
    pageUrl: string,
    directory: string,
    seenHashes: Set<string>
): Promise<void> => {
    const browser = await chromium.launch({headless:false});
    const page = await browser.newPage();

    try {
        await page.goto(pageUrl);
        await page.waitForLoadState("domcontentloaded")
        await page.waitForLoadState("load");
        await page.waitForTimeout(5000);
        // Scroll to the bottom to trigger lazy loading
        await page.evaluate(async () => {
            await new Promise<void>((resolve) => {
                let totalHeight = 0;
                const distance = 100;
                const timer = setInterval(() => {
                    window.scrollBy(0, distance);
                    totalHeight += distance;
                    if (totalHeight >= document.body.scrollHeight) {
                        clearInterval(timer);
                        resolve();
                    }
                }, 100);
            });
        });
        await page.waitForTimeout(15000);
        // Extract image URLs, Base64 data, alt attributes, and inline SVGs
        const images = await page.evaluate(() => {
            const results: { src: string; alt: string }[] = [];

            // Extract regular and Base64 images
            const imgElements = document.querySelectorAll('img');
            imgElements.forEach((img) => {
                const src = img.getAttribute('src');
                const alt = img.getAttribute('alt') || 'image';
                if (src) results.push({ src, alt });
            });

            // Extract inline SVGs
            const svgElements = document.querySelectorAll('svg');
            svgElements.forEach((svg, index) => {
                const serializer = new XMLSerializer();
                const svgContent = serializer.serializeToString(svg);
                results.push({ src: `data:image/svg+xml,${encodeURIComponent(svgContent)}`, alt: `svg-${index}` });
            });

            return results;
        });

        log('INFO', `Found ${images.length} images on ${pageUrl}`);

        const limit = pLimit(5); // Limit concurrency

        await Promise.all(
            images.map(async (image, index) => {
                const isBase64 = image.src.startsWith('data:image');
                const resolvedUrl = isBase64
                    ? image.src
                    : new URL(image.src, pageUrl).href;

                if (isBase64) {
                    // Handle Base64 images
                    saveBase64Image(resolvedUrl, directory, image.alt, seenHashes);
                } else {
                    // Download regular images
                    await limit(() => downloadImageWithMD5(resolvedUrl, directory, seenHashes, image.alt));
                }
            })
        );
    } catch (error) {
        log('ERROR', `Failed to fetch images from ${pageUrl}: ${error}`);
    } finally {
        await browser.close();
    }
};

// Main function to process a list of URLs
export const downloadImagesFromUrls = async (urls: string[], rootDirectory: string): Promise<void> => {
    log('INFO', 'Starting image download process...');
    ensureDirectory(rootDirectory);

    const seenHashes = new Set<string>(); // Store MD5 hashes to avoid duplicates

    for (const url of urls) {
        log('INFO', `Processing URL: ${url}`);
        const domainDirectory = path.join(rootDirectory, sanitize(new URL(url).hostname));
        ensureDirectory(domainDirectory);

        // Use Puppeteer for dynamic rendering
        await fetchImagesWithPuppeteer(url, domainDirectory, seenHashes);
    }

    log('INFO', 'All image downloads completed.');
};

// // Example usage
// (async () => {
//     const urls = [
//         'https://example.com/page1',
//         'https://example.com/page2',
//     ];
//     const downloadDirectory = './downloaded_images';

//     await downloadImagesFromUrls(urls, downloadDirectory);
// })();
