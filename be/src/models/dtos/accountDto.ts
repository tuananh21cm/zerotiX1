import { v4 as uuid } from "uuid";
export class accountDto {
    id = uuid();
    name:string="";
    cookie:string="";
    avatar:string="";
    link:string="";
    account:string="";
    password:string="";
    static createObj = (src?: Partial<accountDto>): accountDto => {
        const obj = new accountDto();
        return {
            ...obj,
            ...src, 
        };
    };
}
