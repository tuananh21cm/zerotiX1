import { ObjectId } from "mongodb";

export class profileToolListDto {
    _id=new ObjectId();
    profileName:string ;
    order:number; 
    category: string;
    folderPath: string;
    static createObj = (src?: Partial<profileToolListDto>): profileToolListDto => {
        const obj = new profileToolListDto();
        return {
            ...obj,
            ...src, 
        };
    };
}

