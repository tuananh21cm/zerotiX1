import { v4 as uuid } from "uuid";

export class trashProfileDto {
    profileId = uuid();
    url="";
    createAt: Date = new Date();
    static createObj = (src?: Partial<trashProfileDto>): trashProfileDto => {
        const obj = new trashProfileDto();
        return {
            ...obj,
            ...src, 
        };
    };
}

