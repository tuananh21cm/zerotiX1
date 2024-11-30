import { ObjectId } from "mongodb";
import { mongoPromise } from "../../../db/mongo";
import { IProfile } from "./scanProfile";
import { trashProfileDto } from "../../../models/dtos/trashProfileDto";
interface IParamTrashProfile{
    profileId:string;
    url:string
}
export const updateProfileByPost = async (idProfile: string, profileData: IProfile) => {
    try {
        const db = await mongoPromise;
        const _id = new ObjectId(idProfile);
        const updateResult = await db.profileScan.updateOne({ _id }, { $set: { ...profileData, updatedAt: new Date() } });
        if (updateResult.matchedCount === 0) {
            console.error("Could not find the entry to update");
            return;
        }
        const updatedProfile = await db.linkPost.findOne({ _id: new ObjectId(idProfile) });
        return updatedProfile;
    } catch (error) {
        console.error(error);
    }
};
export const updateTrashProfile = async (data:IParamTrashProfile) => {
    try {
        const db = await mongoPromise;
        const existingProfile = await db.profileScan.findOne({ _id: new ObjectId(data.profileId) });
        if (!existingProfile) {
            console.error("Profile not found in linkProfile collection");
            return { status: 404, message: "Resource not found" };
        }
        const trashData = trashProfileDto.createObj({ profileId:data.profileId,url:data.url });
        const trashLink = await db.trashProfile.insertOne({ _id: new ObjectId(), ...trashData });
        if (!trashLink.acknowledged) {
            console.error("Failed to insert profile into trashProfile collection");
            return { status: 500, message: "Internal Server Error" };
        }
        const deleteResult = await db.profileScan.deleteOne({ _id: new ObjectId(data.profileId) });
        if (deleteResult.deletedCount === 0) {
            console.error("Failed to delete profile from linkProfile collection");
            return { status: 500, message: "Internal Server Error" };
        }
        return { status: 200, message: "Resource moved to trash successfully" };
    } catch (error) {
        console.error(error);
        return { status: 500, message: "Internal Server Error" };
    }
};
