import { ObjectId } from "mongodb";
import { mongoPromise } from "../../../db/mongo";
export interface IAccount {
    name: string;
    link: string;
    cookie: string;
    avatar: string;
}
export const getAccount = async () => {
    try {
        const db = await mongoPromise;
        const cursor = db.account.find({});
        const result = await cursor.toArray();

        // Exclude specific fields from each document
        const filteredResult = result.map((account) => {
            // Example: Exclude the 'password' and 'privateInfo' fields
            const { password,cookie,avatar,id, ...filteredAccount } = account;
            return filteredAccount;
        });

        return filteredResult;
    } catch (error) {
        console.error(error);
        return { status: 500, message: "Internal Server Error" };
    }
};

export const getSingleAccount = async (_id: string) => {
    try {
        console.log(_id);
        const db = await mongoPromise;
        const projection = { createAt: 0 };
        const cursor = db.account.find({ _id: new ObjectId(_id) }, { projection });
        return cursor.toArray();
    } catch (error) {
        console.error(error);
        return { status: 500, message: "Internal Server Error" };
    }
};
