import { ObjectId } from "mongodb";
import { mongoPromise } from "../../../db/mongo";
import { accountDto } from "../../../models/dtos/accountDto";
export interface IAccount{
    name:string;
    link:string
    cookie:string;
    avatar:string;
}
export const addAccount = async (dataAccount: IAccount) => {
    try {
        const db = await mongoPromise;
        const existingAccount = await db.account.findOne({ link: dataAccount.link });
        if (existingAccount) {
            console.error("account already exists in the database");
            return existingAccount;
        }
        const data = accountDto.createObj(dataAccount);
        const account = await db.account.insertOne({_id:new ObjectId(), ...data });
        if (account.acknowledged !== true) {
            console.error(account);
            return;
        }
        const dataInsert = await db.account.findOne({ _id: account.insertedId });
        if (!dataInsert) {
            console.error("Could not add new entry");
            return;
        }
        return dataInsert;
    } catch (error) {
        console.error(error);
    }
};
