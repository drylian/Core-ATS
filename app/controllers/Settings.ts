import { jsonsv, json } from "utils/Json";
import { dirCR, dirEX } from "utils/Folder";
import root from "controllers/settings/Default";
import Loggings from "controllers/Loggings";
import { gen } from "utils/Gerate";
import { SettingsJson, LoggingsJson } from "interfaces/Controllers";
const core = new Loggings("Settings", "magenta");

import question from "utils/Question";
import { genv4 } from "utils/UuidGen";

const Settings = async () => {
	try {
		core.sys("Iniciando verificações das configurações do painel.");
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
			if (config === "host") {
				core.sys("Configuração de host do banco de dados ainda não foi configurado.");
				return await question({ type: "input", message: `Qual é o host do banco de dados? (${config}) :`, default: "localhost" });
			}
			if (config === "port") {
				core.sys("Configuração de porta do banco de dados ainda não foi configurado.");
				return await question({ type: "input", message: `Qual é a porta usada pelo banco de dados? (${config}) :`, default: "3000" });
			}
			if (config === "database") {
				core.sys("O banco de dados(database) ainda não foi configurado.");
				return await question({ type: "input", message: `Qual é o banco de dados a ser usado? (${config}) :`, default: "database" });
			}
			if (config === "username") {
				core.sys("Configuração de usuário master do banco de dados ainda não foi configurado.");
				return await question({ type: "input", message: `Qual é o usuário do banco de dados? (${config}) :`, default: "root" });
			}
			if (config === "password") {
				core.sys("Configuração de senha do usuário master do banco de dados ainda não foi configurado.");
				return await question({ type: "input", message: `Qual é a senha do usuário usado?(${config}) :`, default: "pass" });
			}
		};

		if (!dirEX(root.configPATH)) {
			core.sys("Pasta de configurações não existe, criando uma.");
			dirCR(root.configPATH);
		}

		if (!dirEX(root.loggingsPATH)) {
			core.sys("Pasta de loggings não existe, criando uma.");
			dirCR(root.loggingsPATH);
		}

		if (!dirEX(root.modelsPATH)) {
			core.sys("Pasta de models não existe, criando uma.");
			dirCR(root.modelsPATH);
		}

		if (!dirEX(root.configPATH + "/loggings.json")) {
			core.sys("Não foi possivel encontrar o arquivo de configuração de loggings, criando.");
		}

		const cs: LoggingsJson = json(root.configPATH + "/loggings.json");
		if (!cs?.level) jsonsv(root.configPATH + "/loggings.json", { level: "Info" });
		if (!cs?.autodelete) jsonsv(root.configPATH + "/loggings.json", { autodelete: 10 });
		if (!cs?.activedelete) jsonsv(root.configPATH + "/loggings.json", { activedelete: "on" });

		if (!dirEX(root.configPATH + "/settings.json")) {
			core.sys("Não foi possivel encontrar o arquivo de configuração do settings, criando.");
		}

		const c: SettingsJson = json(root.configPATH + "/settings.json");

		if (!c?.mode) jsonsv(root.configPATH + "/settings.json", { mode: "dev" });
		if (!c?.proxy?.pterodactyl) jsonsv(root.configPATH + "/settings.json", { proxy: {pterodactyl:"localhost:3000"} });
		if (!c?.proxy?.phpmyadmin) jsonsv(root.configPATH + "/settings.json", { proxy: {phpmyadmin:"localhost:55555"} });
		if (!c?.namespaces?.users) jsonsv(root.configPATH + "/settings.json", { namespaces: { users: genv4() } });
		if (!c?.namespaces?.settings) jsonsv(root.configPATH + "/settings.json", { namespaces: { settings: genv4() } });
		if (!c?.namespaces?.tokens) jsonsv(root.configPATH + "/settings.json", { namespaces: { tokens: genv4() } });
		if (!c?.server?.port) jsonsv(root.configPATH + "/settings.json", { server: { port: await qprefix("server_port") } });
		if (!c?.server?.url) jsonsv(root.configPATH + "/settings.json", { server: { url: await qprefix("server_url") } });
		if (!c?.server?.title) jsonsv(root.configPATH + "/settings.json", { server: { title: await qprefix("server_title") } });
		if (!c?.server?.session) jsonsv(root.configPATH + "/settings.json", { server: { session: gen(128) } });
		if (!c?.server?.refreshTokenSecret) jsonsv(root.configPATH + "/settings.json", { server: { refreshTokenSecret: `refreshToken_${gen(128)}` } });
		if (!c?.server?.accessTokenSecret) jsonsv(root.configPATH + "/settings.json", { server: { accessTokenSecret: `accessToken_${gen(128)}` } });

		if (!c?.server?.csrf?.cookie_secret) jsonsv(root.configPATH + "/settings.json", { server: { csrf: { cookie_secret: gen(128) } } });
		if (!c?.server?.csrf?.secret) jsonsv(root.configPATH + "/settings.json", { server: { csrf: { secret: gen(128) } } });

		if (!c?.server?.csrf?.samesite) jsonsv(root.configPATH + "/settings.json", { server: { csrf: { samesite: false } } });
		if (!c?.server?.csrf?.secure) jsonsv(root.configPATH + "/settings.json", { server: { csrf: { secure: false } } });
		if (!c?.server?.csrf?.signed) jsonsv(root.configPATH + "/settings.json", { server: { csrf: { signed: false } } });
		if (!c?.server?.csrf?.size) jsonsv(root.configPATH + "/settings.json", { server: { csrf: { size: 64 } } });
		if (!c?.server?.csrf?.ignoreroutes) jsonsv(root.configPATH + "/settings.json", { server: { csrf: { ignoreroutes: "" } } });

		if (!c?.database?.dialect) jsonsv(root.configPATH + "/settings.json", { database: { dialect: "sqlite" } });

		/**
		 * Rele o Json com as novas configurações salvas
		 */
		const css = json(root.configPATH + "/settings.json"); // Rele o json e atualiza os valores atuais

		/**
		 * Cors config
		 */
		if (!css?.server?.cors?.allowedroutes) jsonsv(root.configPATH + "/settings.json", { server: { cors: { allowedroutes: `${css.server.url}:${css.server.port},http://localhost:80,http://localhost:8080,http://127.0.0.1,http://127.0.0.1:8080,http://127.0.0.1:80` } } });

		if (css.mode === "dev" && css.database.dialect === "sqlite") {
			if (!css?.database?.storage) core.sys("Database em modo desenvolvedor, após finalizar o processo o database será deletado.");
		} else if (css.database.dialect === "sqlite") {
			if (!css?.database?.storage) jsonsv(root.configPATH + "/settings.json", { database: { storage: root.configPATH + "/core.sqlite" } });
		}
		if (css.database?.dialect === "mysql" || c.database?.dialect === "mariadb") {
			core.sys("Database externo detectado, verificando configurações");
			if (!css?.database?.port) jsonsv(root.configPATH + "/settings.json", { database: { port: await qprefix("port") } });
			if (!css?.database?.host) jsonsv(root.configPATH + "/settings.json", { database: { host: await qprefix("host") } });
			if (!css?.database?.database) jsonsv(root.configPATH + "/settings.json", { database: { database: await qprefix("database") } });
			if (!css?.database?.username) jsonsv(root.configPATH + "/settings.json", { database: { username: await qprefix("username") } });
			if (!css?.database?.password) jsonsv(root.configPATH + "/settings.json", { database: { password: await qprefix("password") } });
		}

		/**
		 * Cores do painel(Frontend)
		 */
		const color = json(root.configPATH + "/color.json"); // Rele o json e atualiza os valores atuais
		if (!color?.primaria) jsonsv(root.configPATH + "/color.json", { primaria: "#3490dc" });
		if (!color?.secundaria) jsonsv(root.configPATH + "/color.json", { secundaria: "#f39c12" });
		if (!color?.background?.type) jsonsv(root.configPATH + "/color.json", { background: { type: "color" } });
		if (!color?.background?.value) jsonsv(root.configPATH + "/color.json", { background: { value: "#ffffff" } });

		core.sys("Configurações do painel forão verificadas e aprovadas.");


	} catch (err: any) {
		core.error("Erro ao tentar fazer as verificações do painel: " + err.stack);
		return err;
	}

}

export default Settings;