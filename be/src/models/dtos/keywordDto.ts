import { v4 as uuid } from "uuid";
export class keywordTitleDto {
    id = uuid();
    keyword:string="";
    category:string="";
    isActive:boolean=true;
    static createObj = (src?: Partial<keywordTitleDto>): keywordTitleDto => {
        const obj = new keywordTitleDto();
        return {
            ...obj,
            ...src, 
        };
    };
}
