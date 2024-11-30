import { ObjectId } from "mongodb";
import { mongoPromise } from "../../../db/mongo";
export interface IAccount{
    name:string;
    link:string
    cookie:string;
    avatar:string;
}
export const deleteAccount = async (accountId: string) => {
    try {
        const db = await mongoPromise;
        const deleteResult = await db.account.deleteOne({ _id: new ObjectId(accountId) });

        if (deleteResult.deletedCount === 0) {
            console.error("Could not find the entry to delete");
            return { status: 404, message: "Resource not found" };
        }
        return { status: 200, message: "Resource deleted successfully" };
    } catch (error) {
        console.error(error);
        return { status: 500, message: "Internal Server Error" };
    }
};
