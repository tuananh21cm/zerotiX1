// src/routes/api/data.ts
import fs from 'fs';
import path from 'path';

export async function GetDataJson() {
  const filePath = path.resolve('C:/code/web/zeroti-self-api/src/db/jsonData/listProfile.json');
  const rawData = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(rawData);
  return data;
}
