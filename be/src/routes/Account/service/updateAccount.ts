import { ObjectId } from "mongodb";
import { mongoPromise } from "../../../db/mongo";
export interface IAccount{
    name:string;
    link:string
    cookie:string;
    avatar:string;
}
export const putAccount = async(accountData:IAccount,accountId:string)=>{
    try {
        const db = await mongoPromise;
    const updateResult = await db.account.updateOne({ _id: new ObjectId(accountId) }, { $set: { ...accountData, updatedAt: new Date() } });
    if (updateResult.matchedCount === 0) {
        console.error("Could not find the entry to update");
        return;
    }
    const updatedAccount = await db.account.findOne({ _id: new ObjectId(accountId) });
    return updatedAccount;
    } catch (error) {
        console.error(error);
    }
};