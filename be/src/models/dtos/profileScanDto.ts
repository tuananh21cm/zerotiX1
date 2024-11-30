import { ObjectId } from "mongodb";
import { v4 as uuid } from "uuid";
export class ProfileScanDto {
    id = uuid();
    name:string="";
    link:string="";
    content:string="";
    cmtTime:number=0;
    createAt: Date = new Date();
    post:ObjectId;
    iSendMessage:boolean=false;
    isResponse:boolean=false;
    assignProfile:ObjectId;
    static createObj = (src?: Partial<ProfileScanDto>): ProfileScanDto => {
        const obj = new ProfileScanDto();
        return {
            ...obj,
            ...src, 
        };
    };
}
