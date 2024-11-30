import fs from "fs/promises";
export const configCookie = async (input: any) => {
    const input2 = await configGetCookieFromFile(input);
    const cookies = JSON.parse(JSON.stringify(input2));
    cookies.map((item: any) => {
        if (item?.sameSite) {
            delete item.sameSite;
        }
    });
    return cookies;
};

export const configGetCookieFromFile = async (nameFile: string) => {
    try {
        const filePath = `../../web/zeroti-self-api/src/cookies/${nameFile}Cookie.json`;
        // C:\code\web\zeroti-self-api\src\cookies\trantuananhCookie.json
        const data = await fs.readFile(filePath, "utf-8");
        const cookie = JSON.parse(data);
        return cookie;
    } catch (err) {
        console.error(`Error reading file: ${err}`);
        throw err; 
    }
};
