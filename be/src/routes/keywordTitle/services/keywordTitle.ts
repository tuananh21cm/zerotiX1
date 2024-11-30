import { ObjectId } from "mongodb";
import { mongoPromise } from "../../../db/mongo";
import { keywordTitleDto } from "../../../models/dtos/keywordDto";
export interface IKeywordTitle{
    keyword:string;
    category:string;
    isActive:boolean
};
export  const addKeyWordTitle =async (data:IKeywordTitle)=>{
    try {
        console.log({data})
        const db = await mongoPromise;
        const existingTitleKeyword = await db.keywordTitle.findOne({ keyword: data.keyword });
        if (existingTitleKeyword) {
            console.error("Title already exists in the database");
            return existingTitleKeyword;
        }
        const dataCreate= keywordTitleDto.createObj(data);
        const key = await db.keywordTitle.insertOne({...dataCreate,_id:new ObjectId()});
        if (key.acknowledged !== true) {
            console.error(key);
            return;
        }
        const dataKey = await db.profileScan.findOne({ _id: key.insertedId });
        if (!dataKey) {
            console.error("Could not add new entry");
            return;
        }
        return dataKey;
    } catch (error) {
        console.error(error);
    }
}


export const addKeywordsBatch = async (dataArray: IKeywordTitle[]) => {
    try {
        const db = await mongoPromise;
        const collection = db.keywordTitle;
        const insertedDocuments = [];
        for (const data of dataArray) {
            const existingTitleKeyword = await collection.findOne({ keyword: data.keyword });
            if (existingTitleKeyword) {
                console.log(`Keyword "${data.keyword}" already exists in the database`);
                insertedDocuments.push(existingTitleKeyword);
                continue; 
            }
            const dataCreate = keywordTitleDto.createObj(data);
            const key = await collection.insertOne({ ...dataCreate, _id: new ObjectId() });
            if (key.acknowledged !== true) {
                console.error(`Failed to insert keyword: ${data.keyword}`, key);
                continue;
            }
            const dataKey = await collection.findOne({ _id: key.insertedId });
            if (dataKey) {
                insertedDocuments.push(dataKey);
            } else {
                console.error(`Could not find inserted document for keyword: ${data.keyword}`);
            }
        }

        return insertedDocuments; 
    } catch (error) {
        console.error("Error inserting batch keywords:", error);
    }
};