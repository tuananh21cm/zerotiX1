import fs from 'fs/promises';
export const configGetCookieFromFile = async (nameFile: string) => {
    try {
        // const filePath = `D:/Zeroti-self/zeroti-self/src/cookies/${nameFile}Cookie.ts`;
        const filePath = `C:/zeroti-self/Zeroti-sale-insight/api/src/cookies/${nameFile}Cookie.ts`;
        const data = await fs.readFile(filePath, 'utf-8');
        const cookie = JSON.parse(data);
        return cookie;
    } catch (err) {
        console.error(`Error reading file: ${err}`);
        throw err; 
    }
};