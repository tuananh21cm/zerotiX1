import { ObjectId } from "mongodb";
interface detailSold{
    title:string,
    image:string
    amount:number
}
interface IDataDetail{
    seller :string;
    total :number;
    detail : any[]
}
export class SystemCrawlDto {
    _id=new ObjectId();
    totalSold:number = 0;
    detail:any[];
    createAt: Date = new Date();
    static createObj = (src?: Partial<SystemCrawlDto>): SystemCrawlDto => {
        const obj = new SystemCrawlDto();
        return {
            ...obj,
            ...src, 
        };
    };
}

