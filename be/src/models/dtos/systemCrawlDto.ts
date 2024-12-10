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
export interface ITopSold30Days{
    title:string;
    imageUrl:string;
    amount:number;
}
export class SystemCrawlDto {
    _id=new ObjectId();
    totalSold:number = 0;
    detail:any[];
    TopSold30Days:ITopSold30Days[]
    createAt: Date = new Date();
    static createObj = (src?: Partial<SystemCrawlDto>): SystemCrawlDto => {
        const obj = new SystemCrawlDto();
        return {
            ...obj,
            ...src, 
        };
    };
}

