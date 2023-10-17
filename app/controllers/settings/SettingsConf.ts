import { jsonsv, json, dirEX, genv4, gen, question } from "@/utils";
import root from "@/controllers/settings/Default";
import { LoggingsMethods } from "../Loggings";
import { ErrType, SettingsJson } from "@/interfaces";

export default async function SettingsConf(core: LoggingsMethods) {
    core.sys("tentando configurar as [Configurações principais].blue do painel [2/4]");

    try {
        const qprefix = async (config: string) => {
            if (config === "server_title") {
                core.sys("O nome do painel ainda não foi definido.");
                return await question({ type: "input", message: `Qual é o nome do painel? (${config}) :`, default: "Core" });
            }
            if (config === "server_port") {
                core.sys("Configuração de porta do painel ainda não foi configurada.");
                return await question({ type: "input", message: `Qual é a porta do painel? (${config}) :`, default: "3000" });
            }
            if (config === "server_url") {
                core.sys("Configuração de url do painel ainda não foi configurada.");
                return await question({ type: "input", message: `Qual é a url do painel? (${config}) :`, default: "http://localhost" });
            }
        };

        if (!dirEX(root.configPATH + "/settings.json")) {
            core.sys("Não foi possivel encontrar o arquivo de configuração do settings, criando.");
        }

        /**
         * Cores do painel(Frontend)
         */
        let c: SettingsJson = json(root.configPATH + "/settings.json");

        if (!c?.mode) jsonsv(root.configPATH + "/settings.json", { mode: "dev" });
        if (!c?.proxy?.pterodactyl) jsonsv(root.configPATH + "/settings.json", { proxy: { pterodactyl: "localhost:3000" } });
        if (!c?.proxy?.phpmyadmin) jsonsv(root.configPATH + "/settings.json", { proxy: { phpmyadmin: "localhost:55555" } });
        if (!c?.namespaces?.users) jsonsv(root.configPATH + "/settings.json", { namespaces: { users: genv4() } });
        if (!c?.namespaces?.settings) jsonsv(root.configPATH + "/settings.json", { namespaces: { settings: genv4() } });
        if (!c?.namespaces?.tokens) jsonsv(root.configPATH + "/settings.json", { namespaces: { tokens: genv4() } });
        if (!c?.server?.port) jsonsv(root.configPATH + "/settings.json", { server: { port: await qprefix("server_port") } });
        if (!c?.server?.url) jsonsv(root.configPATH + "/settings.json", { server: { url: await qprefix("server_url") } });
        if (!c?.server?.title) jsonsv(root.configPATH + "/settings.json", { server: { title: await qprefix("server_title") } });
        if (!c?.server?.logo) jsonsv(root.configPATH + "/settings.json", { server: { logo: "R:/" } });

        if (!c?.server?.session) jsonsv(root.configPATH + "/settings.json", { server: { session: gen(128) } });
        if (!c?.server?.refreshTokenSecret) jsonsv(root.configPATH + "/settings.json", { server: { refreshTokenSecret: `refreshToken_${gen(128)}` } });
        if (!c?.server?.accessTokenSecret) jsonsv(root.configPATH + "/settings.json", { server: { accessTokenSecret: `accessToken_${gen(128)}` } });

        if (!c?.server?.csrf?.cookie_secret) jsonsv(root.configPATH + "/settings.json", { server: { csrf: { cookie_secret: gen(128) } } });
        if (!c?.server?.csrf?.secret) jsonsv(root.configPATH + "/settings.json", { server: { csrf: { secret: gen(128) } } });

        if (typeof c?.server?.csrf?.samesite !== "boolean") jsonsv(root.configPATH + "/settings.json", { server: { csrf: { samesite: false } } });
        if (typeof c?.server?.csrf?.secure !== "boolean") jsonsv(root.configPATH + "/settings.json", { server: { csrf: { secure: false } } });
        if (typeof c?.server?.csrf?.signed !== "boolean") jsonsv(root.configPATH + "/settings.json", { server: { csrf: { signed: false } } });
        if (!c?.server?.csrf?.size) jsonsv(root.configPATH + "/settings.json", { server: { csrf: { size: 64 } } });
        if (!c?.server?.csrf?.ignoreroutes) jsonsv(root.configPATH + "/settings.json", { server: { csrf: { ignoreroutes: "" } } });

        // rele para garantir que tudo ta ok
        let css: SettingsJson = json(root.configPATH + "/settings.json");

        if (!c?.server?.cors?.allowedroutes) jsonsv(root.configPATH + "/settings.json", { server: { cors: { allowedroutes: `${css.server.url}:${css.server.port},http://localhost:80,http://localhost:8080,http://127.0.0.1,http://127.0.0.1:8080,http://127.0.0.1:80` } } });
        if (typeof c?.server?.cors?.active !== "boolean") jsonsv(root.configPATH + "/settings.json", { server: { cors: { active: true } } });

        if (!c?.database?.dialect) jsonsv(root.configPATH + "/settings.json", { database: { dialect: "sqlite" } });
        core.sys("Configurações principais do painel - [OK].green ");
    } catch (e) {
        core.sys("[Erro nas principais do painel].red : " + (e as ErrType).message)
    }
}