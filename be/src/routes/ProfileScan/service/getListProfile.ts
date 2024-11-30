import { ObjectId } from "mongodb";
import { mongoPromise } from "../../../db/mongo";

export const getListProfileByPost = async(idPost:string)=>{
    try {
        const db = await mongoPromise;
        const id = new ObjectId(idPost);
        const cursor = db.profileScan.find({post:id});
        return cursor.toArray();
    } catch (error) {
        console.error(error);
        return { status: 500, message: 'Internal Server Error' };
    }
};
export const getListProfileByAccount = async(idAccount:string)=>{
    try {
        const db = await mongoPromise;
        const id = new ObjectId(idAccount);
        const cursor = db.profileScan.find({assignProfile:id,iSendMessage:false}).limit(40);
        return cursor.toArray();
    } catch (error) {
        console.error(error);
        return { status: 500, message: 'Internal Server Error' };
    }
};