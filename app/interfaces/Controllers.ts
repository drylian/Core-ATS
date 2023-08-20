
/**
 * Interface controllers/loggings/params
 */

export interface LogType {
    level: number,
    color: string
}

export interface Loggings {
    [key: string]: LogType;
}

/**
 * Interface controllers/loggings/logs
 */

export interface ConsoleLog {
    currentHour: string;
    color: string;
    controller: string;
    levelColor: string;
    level: string;
    message: string;
}

export interface Cores {
    [key: string]: [string];
}

/**
 * interface controllers/Settings
 */
export interface SettingsJson {
    mode: string;
    namespaces: {
        users: string;
        settings: string;
        tokens: string;
    };
    server: {
        port: string;
        url: string;
        title: string;
        session: string;
        refreshTokenSecret: string;
        accessTokenSecret: string;
        csrf: {
            cookie_secret: string;
            secret: string;
            samesite: boolean;
            secure: boolean;
            signed: boolean;
            size: number;
            ignoreroutes: string;
        };
        cors: {
            allowedroutes: string;
        };
    };
    database: {
        dialect: string;
        storage: string;
        port: string;
        host: string;
        password: string;
        username: string;
        database: string;
    };
}
export interface LoggingsJson {
    level: string;
    autodelete: number;
    activedelete: string;
}

/**
 * interface controllers/sequelize/models
 */

export interface Model {
    (): void;
}

export interface Models {
    [key: string]: Model
}
