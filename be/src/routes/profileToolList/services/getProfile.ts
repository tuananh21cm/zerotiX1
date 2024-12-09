import { ObjectId } from "mongodb";
import { mongoPromise } from "../../../db/mongo";

export const getListProfileByCategory= async(category:string)=>{
    try {
        const db = await mongoPromise; 
        const query = category ? { category } : {}; 
        const cursor = db.profileToolList.find(query); 
        console.log({ category }); 
        return await cursor.toArray(); 
    } catch (error) {
        console.error(error);
        return { status: 500, message: 'Internal Server Error' };
    }
};