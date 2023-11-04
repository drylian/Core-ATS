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
    proxy: {
        pterodactyl: string;
        phpmyadmin: string;
    };
    server: {
        port: string;
        url: string;
        title: string;
        logo: string;
        session: string;
        protocol: "http" | "https" | "http/https";
        lang: string;
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
