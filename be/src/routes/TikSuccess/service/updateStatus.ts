import { ObjectId } from "mongodb";
import { mongoPromise } from "../../../db/mongo";
import { profileToolListDto } from "../../../models/dtos/profileToolListDto";

export interface IProfleToolList {
    _id: any;
    profileName: string;
    order: number;
    category: string;
    filePath: string;
    tag: string;
}

export const updateStatus = async (dataProfile: IProfleToolList,status: string) => {
    try {
        const db = await mongoPromise;
        const updatedProfiles = [];

        const existingProfile = await db.profileToolList.findOne({ profileName: dataProfile.profileName });

        if (existingProfile) {
            const updated = await db.profileToolList.updateOne(
                { profileName: dataProfile.profileName },
                { $set: { status } }
            );
            
        } else {
            console.error("Failed to update profile:");
        }
    } catch (error) {
        console.error("Error updating profiles:", error);
        throw error;
    }
};
