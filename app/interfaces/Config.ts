/**
 * interface do settings.json
 */
export interface SettingsJson {
    mode: string;
    namespaces: {
        users: string;
        settings: string;
        tokens: string;
    };
    proxy: {
        pterodactyl: string;
        phpmyadmin: string;
    }
    server: {
        port: string;
        url: string;
        title: string;
        logo: string;
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
            active: boolean;
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

/**
 * interface do loggings.json
 */
export interface LoggingsJson {
    level: string;
    autodelete: number;
    activedelete: string;
}


/**
 * interface do color.json
 */
export interface ColorJson {
    [key: string]: {
        color: {
            primary: string;
            secondary: string;
            tertiary: string;
        };
        text: {
            primary: string;
            secondary: string;
            tertiary: string;
        };
        background: string;
    }
}