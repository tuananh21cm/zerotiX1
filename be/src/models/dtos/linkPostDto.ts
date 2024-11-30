import { v4 as uuid } from "uuid";
export enum category {
    bankLoan = "bankLoan",
    pawn = "pawn",
    licenceLoan = "licenceLoan",
}
export enum assignProfile {
    profile1 = "tranmylinh",
    profile2 = "tranthixuanthuy",
    profile3 = "tuongvynguyen",
}
export class LinkPostDto {
    id = uuid();
    url = "";
    rawUrl ="";
    namePost="";
    like="";
    comment="";
    crawlTime=Date.now();
    postTime="";
    category=category.bankLoan;
    assignProfile=assignProfile.profile1;
    isGetProfile=false; 
    isTrash=false;
    createAt: Date = new Date();
    static createObj = (src?: Partial<LinkPostDto>): LinkPostDto => {
        const obj = new LinkPostDto();
        return {
            ...obj,
            ...src, 
        };
    };
}

