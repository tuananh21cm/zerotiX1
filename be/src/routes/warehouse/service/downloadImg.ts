const axios = require('axios');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
export const downloadImages = async (dataList:any) => {
  if (!fs.existsSync("//172.16.0.30/kbt_global/KBT_Teamx1/Images/Tuan Anh/warehouse/meme")) {
    fs.mkdirSync("//172.16.0.30/kbt_global/KBT_Teamx1/Images/Tuan Anh/warehouse/meme");
  }

  for (const item of dataList) {
    try {
      const { name, img } = item;
      const safeFileName = name + '.jpeg';

      const filePath = path.join("//172.16.0.30/kbt_global/KBT_Teamx1/Images/Tuan Anh/warehouse/test", safeFileName);

      console.log(`Downloading: ${img}`);
      const response = await axios({
        url: img,
        method: 'GET',
        responseType: 'stream',
      });
      const writer = fs.createWriteStream(filePath);
      response.data.pipe(writer);
      await new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
      });

      console.log(`Saved: ${filePath}`);
    } catch (error) {
      console.error(`Error downloading ${item.name}:`, error);
    }
  }
};
