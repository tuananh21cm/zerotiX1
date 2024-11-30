interface IServerConfig {
    mongoDb: {
        connectionString: string;
        dbName: string;
        extPrefix: string;
        sysPrefix: string;
    };
}

const config: { [key: string]: IServerConfig } = {
    qa: {
        mongoDb: {
            connectionString: "mongodb+srv://tuananh:1512@restaurant.cxthp4s.mongodb.net/",
            dbName: "Accesstrade",
            extPrefix: "",
            sysPrefix: "sys_",
        },
    },

    production: {
        mongoDb: {
            connectionString: "mongodb://localhost",
            dbName: "zeroti-self",
            extPrefix: "",
            sysPrefix: "sys_",
        },
    },

    development: {
        mongoDb: {
            // connectionString: "mongodb://lms_user:Dr%40ph0ny@draphony.westeurope.cloudapp.azure.com:27017/",
            connectionString: "mongodb+srv://tuananh:1512@restaurant.cxthp4s.mongodb.net/",
            dbName: "Accesstrade",
            extPrefix: "",
            sysPrefix: "sys_",
        },
    },
};

const dbEnvironment: string = process.env.dbEnvironment ?? process.env.NODE_ENV ?? "development";
const dbConfig: IServerConfig = config[dbEnvironment];

if (process?.env?.dbConnectionString !== undefined && process?.env?.dbConnectionString !== null) {
    dbConfig.mongoDb.connectionString = process.env.dbConnectionString;
}

if (process?.env?.dbName !== undefined && process?.env?.dbName !== null) {
    dbConfig.mongoDb.dbName = process.env.dbName;
}

export { dbEnvironment, dbConfig };
