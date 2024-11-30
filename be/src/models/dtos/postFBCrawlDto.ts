import { v4 as uuid } from "uuid";
export interface IPost {
    _id:string;
    content:string;
    url:string,
    likeAmount:number;
    commentAmount:number;
}
export class postFBCrawlDto {
    id = uuid();
    groupName:string="";
    urlGroup:string="";
    bigData:IPost[]=[];
    static createObj = (src?: Partial<postFBCrawlDto>): postFBCrawlDto => {
        const obj = new postFBCrawlDto();
        return {
            ...obj,
            ...src, 
        };
    };
}
