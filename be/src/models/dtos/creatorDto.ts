import { v4 as uuid } from "uuid";
export class creatorDto {
    id = uuid();
    name:string="";
    avt:string=""
    userName:string="";
    fatherCategory:string="";
    childCategory:string="";
    GMV:string="";
    itemSolds:string="";
    AvgViews:string="";
    followerCount:string="";
    isUsed:boolean=false;
    potential:boolean=true;
    static createObj = (src?: Partial<creatorDto>): creatorDto => {
        const obj = new creatorDto();
        return {
            ...obj,
            ...src, 
        };
    };
}
