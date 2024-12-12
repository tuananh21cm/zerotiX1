// src/routes/api/data.ts
import fs from 'fs';
import path from 'path';

export async function GetDataJson() {
  const filePath = path.resolve('//172.16.0.30/kbt_global/KBT_Teamx1/Images/tikSuccess/listProfile.json');
  const rawData = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(rawData);
  return data;
}

import { mongoPromise } from "../../../db/mongo";

export const getProfile = async (category: string, tag: string,status:string) => {
    try {
        const db = await mongoPromise;
        const query: any = {};
        if (category) {
            query.category = category;
        }
        if (tag) {
            query.tag = tag;
        }
        if (tag) {
            query.status = status;
        }
        const profiles = await db.profileToolList.find(query).toArray();
        if (!profiles.length) {
            console.log("No profiles found for the provided category and tag");
        }
        return profiles;
    } catch (error) {
        console.error("Error fetching profiles by category and tag:", error);
        throw error;
    }
};
