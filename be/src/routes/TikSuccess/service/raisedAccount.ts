import { raisedAccountCore } from "../../../core-playwright/TikSuccess/raisedAccount";
import { getFileNameByOrder } from "./getFileNameByOrder";
const basedPath = 'C:/code/X1Code/fe/static/warehouse'
interface IRaisedAccount {
    id: string;
    profileName: string,
    category: string
    order: number;
    filePath: string;
}
import { ObjectId } from "mongodb";
import { mongoPromise } from "../../../db/mongo";
import { getProfile } from "./getProfileName";
const test = [
    {
        _id: new ObjectId("674aec61a14da5bd7fa541e3"),
        profileName: 'DP-TIKTOKNEW-44',
        order: 1,
        category: 'meme',
        filePath: 'meme1',
        tag:"meme-old"
    },
    {
        _id: new ObjectId("674aec61a14da5bd7fa541e5"),
        profileName: 'DUYDUC_TIKTOKUS01',
        order: 1,
        category: 'meme',
        filePath: 'meme1',
        tag:"meme-old"
    },
    {
        _id: new ObjectId("674aec61a14da5bd7fa541e7"),
        profileName: 'TIKTOKNEW463',
        order: 1,
        category: 'meme',
        filePath: 'meme1',
        tag:"meme-old"
    },
    {
        _id: new ObjectId("674aec62a14da5bd7fa541e9"),
        profileName: 'TIKTOKNEW42',
        order: 1,
        category: 'meme',
        filePath: 'meme1',
        tag:"meme-old"
    },
    {
        _id: new ObjectId("674aec62a14da5bd7fa541eb"),
        profileName: 'TIKTOKNEW239',
        order: 1,
        category: 'meme',
        filePath: 'meme1',
        tag:"meme-old"
    },
    {
        _id: new ObjectId("674aec62a14da5bd7fa541ed"),
        profileName: 'TIKTOKNEW225',
        order: 1,
        category: 'meme',
        filePath: 'meme1',
        tag:"meme-old"
    },
    {
        _id: new ObjectId("674aec62a14da5bd7fa541ef"),
        profileName: 'TIKOK140',
        order: 1,
        category: 'meme',
        filePath: 'meme1',
        tag:"meme-old"
    }
]

export const raisedAccount = async () => {
    // const {category,order,filePath} = data;
    // const filePathFull = `${basedPath}/${category}`;
    // const fileName = getFileNameByOrder(filePathFull,order);
    // const profiles = await getProfile();
    const profilesData: any = await getProfile("anime","anime");
    console.log(profilesData.length);
    await raisedAccountCore(profilesData);
}
