import { mongoPromise } from "../../../db/mongo";

export const getListKeyWordsAnalytics = async () => {
    try {
        const db = await mongoPromise;
        const cursor = db.shopPlusProduct.find({}, { projection: { keyword: 1, _id: 0 } });

        const results = await cursor.toArray();
        return results.map(item => item.keyword).filter(Boolean); 
    } catch (error) {
        console.error(error);
        return { status: 500, message: 'Internal Server Error' };
    }
};
