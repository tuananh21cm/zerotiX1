import { mongoPromise } from "../../../db/mongo";

export const getDataKey= async () => {
    try {
        const db = await mongoPromise;
        const cursor = db.shopPlusProduct.find({});

        const results = await cursor.toArray();
        return results; 
    } catch (error) {
        console.error(error);
        return { status: 500, message: 'Internal Server Error' };
    }
};
