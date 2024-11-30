import { mongoPromise } from "../../../db/mongo";
export interface IAccount {
    name: string;
    link: string;
    cookie: string;
    avatar: string;
}
export const getKeys = async () => {
    try {
        const db = await mongoPromise;
        const cursor = db.keywordTitle.find({});
        const result = await cursor.toArray();
        const keywords:string[] = result.map(item => item.keyword);
        return keywords;
    } catch (error) {
        console.error(error);
        return { status: 500, message: "Internal Server Error" };
    }
};
