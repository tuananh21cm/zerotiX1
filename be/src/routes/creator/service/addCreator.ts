import { ObjectId } from "mongodb";
import { mongoPromise } from "../../../db/mongo";
import { accountDto } from "../../../models/dtos/accountDto";
import { creatorDto } from "../../../models/dtos/creatorDto";

export interface ICreator {
    name: string;
    userName: string; 
    GMV: string;
    itemSolds: string;
    AvgViews: string;
    followerCount: string;
    childCategory:string;
    fatherCategory:string;
}
export const addCreator = async (dataCreators: any[]) => {
    try {
        const db = await mongoPromise;
        const addedAccounts = [];
        for (const creator of dataCreators) {
            const existingAccount = await db.creator.findOne({ userName: creator.userName });
            if (existingAccount) {
                console.log(`Account with userName ${creator.userName} already exists in the database`);
                continue; 
            }
            const data = creatorDto.createObj(creator);
            const account = await db.creator.insertOne({ _id: new ObjectId(), ...data });
            if (account.acknowledged) {
                const dataInsert = await db.creator.findOne({ _id: account.insertedId });
                if (dataInsert) {
                    addedAccounts.push(dataInsert);
                } else {
                    console.error("Could not retrieve the added entry for userName:", creator.userName);
                }
            } else {
                console.error("Failed to add account for userName:", creator.userName);
            }
        }

        return addedAccounts; 
    } catch (error) {
        console.error("Error in addAccount:", error);
    }
};
