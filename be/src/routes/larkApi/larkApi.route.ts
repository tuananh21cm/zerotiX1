import { Router } from "express";
export const larkApiRoute = Router();

import axios from "axios";
let accessToken:string = "";
const APP_ID = "cli_a791029060789009";
const APP_SECRET = "js7tcetm7kiEfrc9Dtd87f0Pa33SMZGM";
const USER_EMAIL = 'tuananh@kbt.global'; 
export async function getAccessToken() {
    const url = "https://open.feishu.cn/open-apis/auth/v3/app_access_token/internal/";
    const data = {
        app_id: APP_ID,
        app_secret: APP_SECRET,
    };
    const response = await axios.post(url, data);
    accessToken = response.data.app_access_token;
}
export async function sendMessageToUser(userId:string, accessToken:string, messageText:string) {
    const url = 'https://open.feishu.cn/open-apis/message/v4/send/';
    const headers = { Authorization: `Bearer ${accessToken}` };
    const data = {
        open_id: userId,
        msg_type: 'text',
        content: JSON.stringify({ text: messageText }),
    };

    try {
        await axios.post(url, data, { headers });
        console.log('Message sent to user');
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

export async function getUserIdByEmail(email:string, accessToken:string) {
    const url = 'https://open.feishu.cn/open-apis/contact/v3/users/batch_get_id';
    const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
    };
    const data = {
        emails: [email],
    };

    try {
        const response = await axios.post(url, data, { headers });
        const userId = response.data.data.email_users[email][0].user_id;
        console.log(`User ID for ${email}: ${userId}`);
        return userId;
    } catch (error) {
        console.error('Error fetching user ID:', error);
    }
}

larkApiRoute.get("/start-messaging", async (req, res, next): Promise<void> => {
    try {
        await getAccessToken();
        const userId = await getUserIdByEmail(USER_EMAIL, accessToken);
    
        const intervalId = setInterval(async () => {
            await sendMessageToUser(userId, accessToken, `Message at ${new Date().toLocaleTimeString()}`);
        }, 5000);
    
        res.send('Started sending messages to the user');
    
        req.on('close', () => {
            clearInterval(intervalId);
            console.log('Stopped messaging');
        });
        next();
    } catch (e) {
        console.error(e);
        next();
    }
});
