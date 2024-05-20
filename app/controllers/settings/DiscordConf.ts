import { ErrType, LoggingsJson, SettingsJson } from "@/interfaces";
import { jsonsv, json, dirEX } from "@/utils";
import root from "@/controllers/settings/Default";
import { LoggingsMethods } from "@/controllers/Loggings";

export default async function DiscordConf(core: LoggingsMethods) {
    core.sys("tentando configurar o [discord].blue do painel [5/5]");
    try {

        const discord: SettingsJson = json(root.configPATH + "/settings.json");
        /**
         * Discord Bot Args
         */
        if (!discord?.discord?.token) jsonsv(root.configPATH + "/settings.json", { discord: { token: "" } });
        if (typeof discord?.discord?.active !== "boolean")
            jsonsv(root.configPATH + "/settings.json", { discord: { active: false } });

        /**
         * 0Auth discord Args
         */
        if (!discord?.discord?.auth?.client) jsonsv(root.configPATH + "/settings.json", { discord: { auth: { client: "" } } });
        if (!discord?.discord?.auth?.callback) jsonsv(root.configPATH + "/settings.json", { discord: { auth: { callback: "http://localhost:3000/auth/discord/callback" } } });
        if (!discord?.discord?.auth?.secret) jsonsv(root.configPATH + "/settings.json", { discord: { auth: { secret: "" } } });
        if (typeof discord?.discord?.auth?.active !== "boolean")
            jsonsv(root.configPATH + "/settings.json", { discord: { auth: { active: false } } });
        core.sys("discord do painel - [OK].green ");
    } catch (e) {
        core.sys("[Erro na configuração do discord].red : " + (e as ErrType).message);
    }
}
