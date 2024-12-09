import { v4 as uuid } from "uuid";
export class keyFollowShopPlus {
    id = uuid();
    imageUrl:string="";
    title:string="";
    sales7Days:string;
    totalSales:string;
    static createObj = (src?: Partial<keyFollowShopPlus>): keyFollowShopPlus => {
        const obj = new keyFollowShopPlus();
        return {
            ...obj,
            ...src, 
        };
    };
}
