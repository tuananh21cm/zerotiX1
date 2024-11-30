import { ObjectId } from "mongodb";
import { mongoPromise } from "../../../db/mongo";
import { postFBCrawlDto } from "../../../models/dtos/postFBCrawlDto";
import { crawlFBInit } from "../../../core-playwright/CrawlFb/crawlFBInit";

export const addGroup= async (dataPost: postFBCrawlDto) => {
    try {
        const db = await mongoPromise;
        const existingPost = await db.postFBCrawl.findOne({ link: dataPost.urlGroup });
        if (existingPost) {
            console.error("gr already exists in the database");
            return existingPost;
        }
        const bigData = await crawlFBInit(dataPost.urlGroup);
        const data = postFBCrawlDto.createObj(dataPost);
        const post = await db.postFBCrawl.insertOne({_id:new ObjectId(), ...data,bigData});
        if (post.acknowledged !== true) {
            console.error(post);
            return;
        }
        const dataInsert = await db.postFBCrawl.findOne({ _id: post.insertedId });
        if (!dataInsert) {
            console.error("Could not add new entry");
            return;
        }
        console.log(bigData);
        return dataInsert;
    } catch (error) {
        console.error(error);
    }
};


