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

export const addProfile= async (dataProfile: IProfleToolList) => {
    try {
        const db = await mongoPromise;
        const existingProfile= await db.profileToolList.findOne({ profileName: dataProfile.profileName });
        if (existingProfile) {
            console.error("profile already exists in the database");
            return existingProfile;
        }
        const data = profileToolListDto.createObj(dataProfile);
        const profile = await db.profileToolList.insertOne({_id:new ObjectId(), ...data});
        if (profile.acknowledged !== true) {
            console.error(profile);
            return;
        }
        const dataInsert = await db.profileToolList.findOne({ _id: profile.insertedId });
        if (!dataInsert) {
            console.error("Could not add new entry");
            return;
        }
        console.log(dataInsert);
        return dataInsert;
    } catch (error) {
        console.error(error);
    }
};

