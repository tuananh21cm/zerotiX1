import axios from "axios";
import * as cheerio from 'cheerio';

async function getUserId(username:string) {
  try {
    // Fetch the user's TikTok profile page
    const { data } = await axios.get(`https://www.tiktok.com/@${username}`);
//https://www.tiktok.com/@arcadiaslay
    // Load the HTML into Cheerio
    const $ = cheerio.load(data);
    // Look for the embedded JSON data (usually inside a <script> tag)
    const jsonData = $('script')
      .toArray()
      .map((script) => $(script).html())
    //   .find((scriptContent:string) => scriptContent.includes(`window['"__INIT_DATA__"']`));

      console.log({jsonData})
    if (!jsonData) {
      throw new Error('Unable to find user data');
    }

    // // Extract the user ID from the JSON data
    // const jsonMatch = jsonData.match(/"userInfo":({.*?})/);
    // if (!jsonMatch || !jsonMatch[1]) {
    //   throw new Error('User ID not found');
    // }

    // const userInfo = JSON.parse(`{${jsonMatch[1]}}`); // Parse the JSON
    // const userId = userInfo.userInfo.id; // Extract user ID

    // console.log('User ID:', userId);

  } catch (error) {
    console.error('Error:', error);
  }
}

// Example usage
getUserId('arcadiaslay');  // Replace with actual TikTok username
