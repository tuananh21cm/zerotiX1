import { ObjectId } from "mongodb";

export class profileToolListDto {
    _id=new ObjectId();
    profileName:string ="";
    order:number=1; 
    category: string="";
    folderPath: string="";
    tag:string="default"
    status:string="live"
    static createObj = (src?: Partial<profileToolListDto>): profileToolListDto => {
        const obj = new profileToolListDto();
        return {
            ...obj,
            ...src, 
        };
    };
}

