import { ObjectId } from "mongodb";
import { mongoPromise } from "../../../db/mongo";

export const getKeyWord = async(category:string)=>{
    try {
        const db = await mongoPromise;
        const cursor = db.keywordTitle.find({category});
        return cursor.toArray();
    } catch (error) {
        console.error(error);
        return { status: 500, message: 'Internal Server Error' };
    }
};