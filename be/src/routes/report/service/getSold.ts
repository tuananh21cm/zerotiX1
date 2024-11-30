import { ObjectId } from "mongodb";
import { mongoPromise } from "../../../db/mongo";

export const getDataReport = async()=>{
    try {
        const db = await mongoPromise;
        const cursor = db.crawlSystem.find({});
        return cursor.toArray();
    } catch (error) {
        console.error(error);
        return { status: 500, message: 'Internal Server Error' };
    }
};