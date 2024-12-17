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

export const raisedAccount = async () => {
    // const {category,order,filePath} = data;
    // const filePathFull = `${basedPath}/${category}`;
    // const fileName = getFileNameByOrder(filePathFull,order);
    // const profiles = await getProfile();
    const profilesDataAnime: any = await getProfile("anime","anime","live");
    const profilesDataSport: any = await getProfile("sport","sport-old","live");
    const profilesDataGame: any = await getProfile("game","gamenew","live");
    // await raisedAccountCore(profilesDataAnime);
    await raisedAccountCore(profilesDataGame);
}
