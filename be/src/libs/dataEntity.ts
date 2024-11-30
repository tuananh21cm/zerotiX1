import { ObjectId } from "mongodb";

interface IBusinessEntity {
    id: string;
    [key: string]: any;
}

interface IDataEntity {
    _id: ObjectId;
    [key: string]: any;
}

export const fromDataEntity = <TBusinessEntity, TDataEntity extends IDataEntity = IDataEntity>(
    dataEntity: TDataEntity,
    keepCredentials = false
): TBusinessEntity => {
    const result = {
        ...dataEntity,
    } as any;
    delete result._id;
    if (keepCredentials !== true) {
        delete result["credentials"];
    }

    return (result as any) as TBusinessEntity;
};

export const fromDataEntityId = <TBusinessEntity, TDataEntity extends IDataEntity = IDataEntity>(
    dataEntity: TDataEntity,
    keepCredentials = false
): TBusinessEntity => {
    const result = {
        ...dataEntity,
        id: dataEntity._id.toHexString(),
    } as any;
    delete result._id;
    if (keepCredentials !== true) {
        delete result["credentials"];
    }

    return (result as any) as TBusinessEntity;
};

export const toDataEntity = <TDataEntity, TBusinessEntity extends { id: string } = IBusinessEntity>(businessEntity: TBusinessEntity): TDataEntity => {
    const result = {
        _id: new ObjectId(businessEntity.id),
        ...businessEntity,
    };
    // delete result._id;

    return (result as any) as TDataEntity;
};

export const fromDataEntities = <TBusinessEntity, TDataEntity extends IDataEntity = IDataEntity>(dataEntities: Array<TDataEntity>): Array<TBusinessEntity> =>
    dataEntities?.map((x) => fromDataEntity(x));

export const toDataEntities = <TDataEntity, TBusinessEntity extends { id: string } = IBusinessEntity>(
    businessEntities: Array<TBusinessEntity>
): Array<TDataEntity> => businessEntities.map((x) => toDataEntity(x));

export const fromCourseEntities = <TBusinessEntity, ICourseSimple extends IDataEntity = IDataEntity>(
    dataEntities: Array<ICourseSimple>
): Array<TBusinessEntity> => dataEntities.map((x) => fromDataEntity(x));
