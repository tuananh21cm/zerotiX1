import { ObjectId } from "mongodb";
import { mongoPromise } from "../../../db/mongo";
import { crawlFBInit } from "../../../core-playwright/CrawlFb/crawlFBInit";
import { profileToolListDto } from "../../../models/dtos/profileToolListDto";
export interface IProfleToolList {
    id: ObjectId;
    profileName:string;
    order:number;
    category:string;
    folderPath:string;
    tag:string
}

export const addBatchProfiles = async (dataProfiles: IProfleToolList[]) => {
    try {
        const db = await mongoPromise;
        const insertedProfiles = [];
        for (const dataProfile of dataProfiles) {
            const existingProfile = await db.profileToolList.findOne({ profileName: dataProfile.profileName });
            if (existingProfile) {
                console.log(`Profile "${dataProfile.profileName}" already exists in the database.`);
                continue; 
            }
            const data = profileToolListDto.createObj(dataProfile);
            const profile = await db.profileToolList.insertOne({ _id: new ObjectId(), ...data });
            if (profile.acknowledged === true) {
                const dataInsert = await db.profileToolList.findOne({ _id: profile.insertedId });
                if (dataInsert) {
                    insertedProfiles.push(dataInsert); 
                } else {
                    console.error(`Could not find inserted profile with ID: ${profile.insertedId}`);
                }
            } else {
                console.error("Failed to insert profile:", profile);
            }
        }
        console.log("Inserted Profiles:", insertedProfiles);
        return insertedProfiles;
    } catch (error) {
        console.error("Error adding profiles:", error);
        throw error; 
    }
};
