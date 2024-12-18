const axios = require('axios');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
interface IData {
  name:string,
  amount:number,
  img:string
}
export const downloadImages = async (dataList:IData[]) => {
  if (!fs.existsSync("//172.16.0.30/kbt_global/KBT_Teamx1/Images/Tuan Anh/warehouse/game2")) {
    fs.mkdirSync("//172.16.0.30/kbt_global/KBT_Teamx1/Images/Tuan Anh/warehouse/game2");
  }

  for (const item of dataList) {
    try {
      const { name, img } = item;
      const safeFileName = name + '.jpeg';

      const filePath = path.join("//172.16.0.30/kbt_global/KBT_Teamx1/Images/Tuan Anh/warehouse/game2", safeFileName);

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
    } catch (error) {
      console.error(`Error downloading ${item.name}:`, error);
    }
  }
};
