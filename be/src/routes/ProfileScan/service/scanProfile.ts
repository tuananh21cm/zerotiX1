import { ObjectId } from "mongodb";
import { mongoPromise } from "../../../db/mongo";
import { ProfileScanDto } from "../../../models/dtos/profileScanDto";
export interface IProfile{
    id:string;
    name:string;
    link:string;
    content:string;
    post:ObjectId;
    assignProfile:ObjectId
};
export const scanProfile = async (profileData: IProfile) => {
    try {
        const db = await mongoPromise;
        const existingScanProfile = await db.trashProfile.findOne({ url: profileData.link });
        if (existingScanProfile) {
            console.error("profile already exists in the trash database");
            return existingScanProfile;
        }
        const post = new ObjectId(profileData.post);
        const assignProfile = new ObjectId(profileData.assignProfile);
        console.log("assignProfile :",assignProfile)
        const data= ProfileScanDto.createObj(profileData);
        const profile = await db.profileScan.insertOne({...data,_id:new ObjectId(), post,assignProfile});
        if (profile.acknowledged !== true) {
            console.error(profile);
            return;
        }
        const dataProfileScan = await db.profileScan.findOne({ _id: profile.insertedId });
        if (!dataProfileScan) {
            console.error("Could not add new entry");
            return;
        }
        return dataProfileScan;
    } catch (error) {
        console.error(error);
    }
};
