import { ObjectId } from "mongodb";
import { mongoPromise } from "../../../db/mongo";
import { shopPlusProductDto } from "../../../models/dtos/shopPlusProductDto";

export  const addKeyWordShopPlus =async (data:any)=>{
    try {
        const db = await mongoPromise;
        const existingKeyword = await db.shopPlusProduct.findOne({ keyword: data.keyword });
        if (existingKeyword) {
            console.error("Title already exists in the database");
            return existingKeyword;
        }
        const dataCreate= shopPlusProductDto.createObj(data);
        const key =  db.shopPlusProduct.insertOne({...dataCreate,_id:new ObjectId()});
        
    } catch (error) {
        console.error(error);
    }
}
