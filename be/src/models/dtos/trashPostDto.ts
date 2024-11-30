import { ObjectId } from "mongodb";

export class trashPostDto {
    postId=new ObjectId();
    url = "";
    createAt: Date = new Date();
    static createObj = (src?: Partial<trashPostDto>): trashPostDto => {
        const obj = new trashPostDto();
        return {
            ...obj,
            ...src, 
        };
    };
}

