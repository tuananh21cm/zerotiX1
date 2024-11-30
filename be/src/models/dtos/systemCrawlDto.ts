import { ObjectId } from "mongodb";

export class SystemCrawlDto {
    _id=new ObjectId();
    totalSold:number = 0;
    detail:any=[];
    createAt: Date = new Date();
    static createObj = (src?: Partial<SystemCrawlDto>): SystemCrawlDto => {
        const obj = new SystemCrawlDto();
        return {
            ...obj,
            ...src, 
        };
    };
}

