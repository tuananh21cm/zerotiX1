import { ObjectId } from "mongodb";
export interface IDataProductShopPlus{
    imageUrl:string 
    title:string 
    shopName:string
    sold7Days:string
    soldTotal:string
}
export class shopPlusProductDto {
    id=new ObjectId();
    keyword:string="";
    data:IDataProductShopPlus[];
    createAt: Date = new Date();
    static createObj = (src?: Partial<shopPlusProductDto>): shopPlusProductDto => {
        const obj = new shopPlusProductDto();
        return {
            ...obj,
            ...src, 
        };
    };
}

