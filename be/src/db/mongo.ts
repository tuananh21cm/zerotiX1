import { Collection, Db, MongoClient } from "mongodb";
import { dbConfig } from "./dbConfig";
import { linkPostDataEntity } from "./dataEntities/linkPostDataEntity";
import { profileScanDataEntity } from "./dataEntities/ProfileScanDataEntity";
import { accountDataEntity } from "./dataEntities/accountDataEntity";
import { trashProfileDataEntity } from "./dataEntities/trashProfileDataEntity";
import { trashPostDataEntity } from "./dataEntities/trashPostDataEntity";
import { systemDataEntity } from "./dataEntities/systemCrawlDataEntity";
import { postFBCrawlDataEntity } from "./dataEntities/postFBCrawlDataEntity";
import { creatorDataEntity } from "./dataEntities/creatorDataEntity";
import { keywordTitleDataEntity } from "./dataEntities/keyWordEntity";
import { profieToolListDataEntity } from "./dataEntities/profileToolListDataEntity";
import { clonePro5DataEntity } from "./dataEntities/clonePro5";
import { keyFollowShopPlusDataEntity } from "./dataEntities/keyFollowShopPlusDataEntities";
import { shopPlusProductDataEntity } from "./dataEntities/shopPlusProductDataEntities";

interface IDataStore {
    __client: MongoClient;
    __db: Db;
    linkPost: Collection<linkPostDataEntity>;
    profileScan: Collection<profileScanDataEntity>;
    account:Collection<accountDataEntity>;
    trashProfile:Collection<trashProfileDataEntity>;
    trashPost:Collection<trashPostDataEntity>;
    crawlSystem:Collection<systemDataEntity>;
    postFBCrawl:Collection<postFBCrawlDataEntity>;
    creator:Collection<creatorDataEntity>;
    keywordTitle:Collection<keywordTitleDataEntity>;
    profileToolList:Collection<profieToolListDataEntity>;
    clonePro5:Collection<clonePro5DataEntity>;
    keyFollowShopPlus:Collection<keyFollowShopPlusDataEntity>;
    shopPlusProduct:Collection<shopPlusProductDataEntity>;
}
export let dbConnectionCount = 0;
async function initMongoDb(): Promise<IDataStore> {
    console.info("Connecting to MongoDb:", dbConfig);
    dbConnectionCount = dbConnectionCount + 1;

    const client = await MongoClient.connect(dbConfig.mongoDb.connectionString);
    const db = client.db(dbConfig.mongoDb.dbName);
    const linkPost = db.collection<linkPostDataEntity>(`${dbConfig.mongoDb.sysPrefix}linkPost`);
    const profileScan = db.collection<profileScanDataEntity>(`${dbConfig.mongoDb.sysPrefix}profileScan`);
    const account = db.collection<accountDataEntity>(`${dbConfig.mongoDb.sysPrefix}account`);
    const trashProfile = db.collection<trashProfileDataEntity>(`${dbConfig.mongoDb.sysPrefix}trashProfile`);
    const trashPost = db.collection<trashPostDataEntity>(`${dbConfig.mongoDb.sysPrefix}trashPost`);
    const crawlSystem = db.collection<systemDataEntity>(`${dbConfig.mongoDb.sysPrefix}systemCrawl`);
    const postFBCrawl = db.collection<postFBCrawlDataEntity>(`${dbConfig.mongoDb.sysPrefix}postFBCrawl`);
    const creator = db.collection<creatorDataEntity>(`${dbConfig.mongoDb.sysPrefix}creator`);
    const keywordTitle = db.collection<keywordTitleDataEntity>(`${dbConfig.mongoDb.sysPrefix}keywordTitle`);
    const profileToolList = db.collection<profieToolListDataEntity>(`${dbConfig.mongoDb.sysPrefix}profileToolList`);
    const clonePro5 = db.collection<clonePro5DataEntity>(`${dbConfig.mongoDb.sysPrefix}clonePro5`);
    const keyFollowShopPlus = db.collection<keyFollowShopPlusDataEntity>(`${dbConfig.mongoDb.sysPrefix}clonePro5`);
    const shopPlusProduct = db.collection<shopPlusProductDataEntity>(`${dbConfig.mongoDb.sysPrefix}shopPlusProduct`);

    return {
        __client: client,
        __db: db,
        linkPost,
        profileScan,
        account,
        trashProfile,
        trashPost,
        crawlSystem,
        postFBCrawl,
        creator,
        keywordTitle,
        profileToolList,
        clonePro5,
        keyFollowShopPlus,
        shopPlusProduct
    };
}


const _mongoDb = initMongoDb();
export const mongoPromise = _mongoDb;
