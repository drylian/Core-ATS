import { Dialect } from "sequelize";

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
    discord: {
        token: string;
        active: boolean;
        auth: {
            active: boolean;
            client: string;
            secret: string;
            callback: string;
        }
    }
    proxy: {
        pterodactyl: string;
        phpmyadmin: string;
    };
    smtp: {
        active: boolean;
        host: string;
        port: number;
        secure: boolean;
        username: string;
        password: string;
        from: string;
    };
    server: {
        register:boolean;
        port: string;
        url: string;
        title: string;
        description: string;
        logo: string;
        session: string;
        protocol: "http" | "https" | "http/https";
        lang: string;
        refreshTokenSecret: string;
        accessTokenSecret: string;
        socketSignature:string;
        csrf: {
            secret: string;
            samesite: boolean;
            ignored: string[];
        };
        signature: string;
        cors: {
            active: boolean;
            allowedroutes: string[];
        };
    };
    database: {
        dialect: Dialect;
        storage: string;
        port: number;
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
interface ColorValues {
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
export interface ColorJson {
    selected: "black" | "white"; // Apenas "black" ou "white" são permitidos
    black: ColorValues;
    white: ColorValues;
}
