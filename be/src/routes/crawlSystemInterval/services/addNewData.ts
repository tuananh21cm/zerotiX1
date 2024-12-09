import { mongoPromise } from "../../../db/mongo";
import { sendEmail, sendEmailYesterday } from "../../../utils/sendMail";
export interface IData {
    _id: any;
    totalSold: number;
    detail: any;
    createAt: any;
}
export enum DAYTYPE{
    TODAY="TODAY",
    YESTERDAY="YESTERDAY"
}
export const addNewData = async (dataSystem: any,dateType:DAYTYPE) => {
    try {
        const db = await mongoPromise;
        const collection = db.crawlSystem;

        const existData = await collection.findOne({}, { sort: { createdAt: -1 } }); // Get the newest document by createdAt or totalSold

        if (existData) {
            if (dataSystem.totalSold !== existData.totalSold) {
                // Update only specific fields explicitly to avoid MongoDB type mismatch errors
                const updatedData = await collection.updateOne(
                    { _id: existData._id }, // Match the latest document by ID
                    { 
                        $set: {
                            totalSold: dataSystem.totalSold,
                            detail: dataSystem.detail,
                            createAt: dataSystem.createAt
                        }
                    }
                );
                if(dateType == DAYTYPE.TODAY){
                    sendEmail(dataSystem)
                }
                else{
                    sendEmailYesterday(dataSystem);
                }
                console.log("Database updated with new data.");
                return updatedData;
            } else if (dataSystem.totalSold === existData.totalSold) {
                console.log("The provided data has the same totalSold as the latest entry. No update needed.");
                return existData;
            }
        } else {
            // If no data exists, insert the new document
            const insertedData = await collection.insertOne(dataSystem);
            console.log("Inserted new data as no existing records found.");
            return insertedData;
        }

        // const data = SystemCrawlDto.createObj(dataSystem);
        // const account = await db.crawlSystem.insertOne({ _id: new ObjectId(), ...data });
        // if (account.acknowledged !== true) {
        //     console.error(account);
        //     return;
        // }
        // const dataInsert = await db.account.findOne({ _id: account.insertedId });
        // if (!dataInsert) {
        //     console.error("Could not add new entry");
        //     return;
        // }
        // return dataInsert;
    } catch (error) {
        console.error(error);
    }
};
