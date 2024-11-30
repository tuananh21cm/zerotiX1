
import { ObjectId } from "mongodb";

export type IDataEntity<TData> = {
    _id: ObjectId;
} & TData;
