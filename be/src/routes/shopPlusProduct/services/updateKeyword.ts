import { ObjectId } from "mongodb";
import { mongoPromise } from "../../../db/mongo";
import { shopPlusProductDto } from "../../../models/dtos/shopPlusProductDto";

export const updateOrAddKeyWordShopPlus = async (data: any) => {
    try {
        const db = await mongoPromise;

        const existingKey = await db.shopPlusProduct.findOne({ keyword: data.keyword });

        if (existingKey) {
            await db.shopPlusProduct.updateOne(
                {keyword:data.keyword},
                { $set:{data:data.data} }
            );
            
        } else {
            console.error("Failed to update profile:");
        }
    } catch (error) {
        console.error("Error updating or adding keyword:", error);
        throw error;
    }
};
