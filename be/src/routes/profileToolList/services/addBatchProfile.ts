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
}

export const addBatchProfiles = async (dataProfiles: IProfleToolList[]) => {
    try {
        const db = await mongoPromise;

        // Array to store successfully inserted profiles
        const insertedProfiles = [];

        // Loop through each profile in the input array
        for (const dataProfile of dataProfiles) {
            // Check if the profile already exists
            const existingProfile = await db.profileToolList.findOne({ profileName: dataProfile.profileName });
            if (existingProfile) {
                console.log(`Profile "${dataProfile.profileName}" already exists in the database.`);
                continue; // Skip to the next profile
            }

            // Create the profile object and insert it
            const data = profileToolListDto.createObj(dataProfile);
            const profile = await db.profileToolList.insertOne({ _id: new ObjectId(), ...data });

            // Check if the insertion was successful
            if (profile.acknowledged === true) {
                const dataInsert = await db.profileToolList.findOne({ _id: profile.insertedId });
                if (dataInsert) {
                    insertedProfiles.push(dataInsert); // Add the inserted profile to the list
                } else {
                    console.error(`Could not find inserted profile with ID: ${profile.insertedId}`);
                }
            } else {
                console.error("Failed to insert profile:", profile);
            }
        }

        // Log and return all successfully inserted profiles
        console.log("Inserted Profiles:", insertedProfiles);
        return insertedProfiles;
    } catch (error) {
        console.error("Error adding profiles:", error);
        throw error; // Re-throw the error for further handling
    }
};
