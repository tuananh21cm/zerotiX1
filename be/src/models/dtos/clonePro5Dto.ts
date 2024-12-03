import { v4 as uuid } from "uuid";
export class clonePro5Dto {
    id = uuid();
    profile:string="";
    totalSold:number;
    title:string="";
    imgUrl:string="";
    dsUrl:string="";
    sold:string="";
    static createObj = (src?: Partial<clonePro5Dto>): clonePro5Dto => {
        const obj = new clonePro5Dto();
        return {
            ...obj,
            ...src, 
        };
    };
}
