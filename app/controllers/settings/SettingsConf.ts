import { jsonsv, json, dirEX, genv4, gen, question } from "@/utils";
import root from "@/controllers/settings/Default";
import { LoggingsMethods } from "@/controllers/Loggings";
import { ErrType, SettingsJson } from "@/interfaces";

export default async function SettingsConf(core: LoggingsMethods) {
	core.sys("tentando configurar as [Configurações principais].blue do painel [2/5]");
	try {
		const qprefix = async (config: string, padrao?: string) => {
			if (config === "server_title") {
				core.sys("O nome do painel ainda não foi definido.");
				return await question({
					type: "input",
					message: `Qual é o nome do painel? (${config}) :`,
					default: "Core",
				});
			}
			if (config === "server_port") {
				core.sys("Configuração de porta do painel ainda não foi configurada.");
				return await question({
					type: "input",
					message: `Qual é a porta do painel? (${config}) :`,
					default: "3000",
				});
			}
			if (config === "server_url") {
				core.sys("Configuração de url do painel ainda não foi configurada.");
				return await question({
					type: "input",
					message: `Qual é a url do painel? (${config}) :`,
					default: "http://localhost",
				});
			}
			if (config === "server_protocol") {
				core.sys("Configuração de protocolo do painel ainda não foi configurada.");
				return await question({
					type: "list",
					message: "Escolha o protocolo que o painel vai aceitar?  :",
					choices: [
						"HTTP (Aceitará apenas protocolos \"http://\")",
						"HTTPS (Recomendado, Aceitará apenas protocolos \"https://\")",
						"HTTP/HTTPS (Aceitará os dois tipos de protocolos\"(http://\" - \"https://\"))",
					],
				});
			}
			if (config === "server_lang_select") {
				core.sys("Configuração de linguagem do painel ainda não foi configurada.");
				return await question({
					type: "list",
					message: "Linguagem o painel vai usar? na api e no frontend:",
					choices: ["en", "pt-BR", "ch"],
				});
			}
			if (config === "server_protocol_select") {
				core.sys(
					"Gostaria de usar dominios personalizados? separe por vírgulas ',' sem usar 'http://' ou 'https://'., não use porta",
				);
				return await question({
					type: "input",
					message: `Qual sera os dominios? (${config}) :`,
					default: padrao,
				});
			}
		};

		if (!dirEX(root.configPATH + "/settings.json")) {
			core.sys("Não foi possivel encontrar o arquivo de configuração do settings, criando.");
		}

		/**
		 * Cores do painel(Frontend)
		 */
		const c: SettingsJson = json(root.configPATH + "/settings.json");

		if (!c?.mode) jsonsv(root.configPATH + "/settings.json", { mode: "pro" });
		if (typeof c?.server?.register !== "boolean")
			jsonsv(root.configPATH + "/settings.json", { server: { register: true } });
		if (!c?.proxy?.pterodactyl)
			jsonsv(root.configPATH + "/settings.json", { proxy: { pterodactyl: "localhost:3000" } });
		if (!c?.proxy?.phpmyadmin)
			jsonsv(root.configPATH + "/settings.json", { proxy: { phpmyadmin: "localhost:55555" } });
		if (!c?.namespaces?.users) jsonsv(root.configPATH + "/settings.json", { namespaces: { users: genv4() } });
		if (!c?.namespaces?.settings) jsonsv(root.configPATH + "/settings.json", { namespaces: { settings: genv4() } });
		if (!c?.namespaces?.tokens) jsonsv(root.configPATH + "/settings.json", { namespaces: { tokens: genv4() } });
		if (!c?.server?.port)
			jsonsv(root.configPATH + "/settings.json", { server: { port: await qprefix("server_port") } });
		if (!c?.server?.url)
			jsonsv(root.configPATH + "/settings.json", { server: { url: await qprefix("server_url") } });
		if (!c?.server?.title)
			jsonsv(root.configPATH + "/settings.json", { server: { title: await qprefix("server_title") } });
		if (!c?.server?.protocol) {
			const selected = await qprefix("server_protocol");
			if (selected?.startsWith("HTTP"))
				jsonsv(root.configPATH + "/settings.json", { server: { protocol: "http" } });
			else if (selected?.startsWith("HTTPS"))
				jsonsv(root.configPATH + "/settings.json", { server: { protocol: "https" } });
			else if (selected?.startsWith("HTTP/HTTPS"))
				jsonsv(root.configPATH + "/settings.json", { server: { protocol: "http/https" } });
		}
		if (!c?.server?.lang)
			jsonsv(root.configPATH + "/settings.json", { server: { lang: await qprefix("server_lang_select") } });

		if (!c?.server?.session) jsonsv(root.configPATH + "/settings.json", { server: { session: gen(128) } });
		if (!c?.server?.refreshTokenSecret)
			jsonsv(root.configPATH + "/settings.json", { server: { refreshTokenSecret: `refreshToken_${gen(128)}` } });
		if (!c?.server?.accessTokenSecret)
			jsonsv(root.configPATH + "/settings.json", { server: { accessTokenSecret: `accessToken_${gen(128)}` } });
		if (!c?.server?.socketSignature)
			jsonsv(root.configPATH + "/settings.json", { server: { socketSignature: `socketToken_${gen(128)}` } });
		if (!c?.server?.signature)
			jsonsv(root.configPATH + "/settings.json", { server: { signature: gen(128) } });

		if (!c?.server?.csrf?.secret)
			jsonsv(root.configPATH + "/settings.json", { server: { csrf: { secret: gen(128) } } });

		if (typeof c?.server?.csrf?.samesite !== "boolean")
			jsonsv(root.configPATH + "/settings.json", { server: { csrf: { samesite: true } } });
		if (!c?.server?.csrf?.ignored)
			jsonsv(root.configPATH + "/settings.json", { server: { csrf: { ignored: [""] } } });

		// rele para garantir que tudo ta ok
		const css: SettingsJson = json(root.configPATH + "/settings.json");

		if (!css?.server?.cors?.allowedroutes) {
			if (css.server.protocol === "http") {
				const selected = await qprefix("server_protocol_select", `${css.server.url},localhost,127.0.0.1`);
				const allowedRoutes = selected ? selected.split(',') : [];
				jsonsv(root.configPATH + "/settings.json", { server: { cors: { allowedroutes: allowedRoutes } } });
			} else if (css.server.protocol === "https") {
				const selected = await qprefix("server_protocol_select", `${css.server.url}`);
				const allowedRoutes = selected ? selected.split(',') : [];
				jsonsv(root.configPATH + "/settings.json", { server: { cors: { allowedroutes: allowedRoutes } } });
			} else if (css.server.protocol === "http/https") {
				const selected = await qprefix("server_protocol_select", `${css.server.url},localhost,127.0.0.1`);
				const allowedRoutes = selected ? selected.split(',') : [];
				jsonsv(root.configPATH + "/settings.json", { server: { cors: { allowedroutes: allowedRoutes } } });
			}
		}

		if (typeof css?.server?.cors?.active !== "boolean")
			jsonsv(root.configPATH + "/settings.json", { server: { cors: { active: true } } });

		if (!c?.database?.dialect) jsonsv(root.configPATH + "/settings.json", { database: { dialect: "sqlite" } });

		/**
		 * Mailer Configs
		 */
		if (typeof css?.smtp?.active !== "boolean")
			jsonsv(root.configPATH + "/settings.json", { smtp: { active: false } });
		if (!css?.smtp?.host) jsonsv(root.configPATH + "/settings.json", { smtp: { host: "mailer.smtp.com" } });
		if (!css?.smtp?.port) jsonsv(root.configPATH + "/settings.json", { smtp: { port: 465 } });
		if (typeof css?.smtp?.secure !== "boolean")
			jsonsv(root.configPATH + "/settings.json", { smtp: { secure: false } });
		if (!css?.smtp?.username)
			jsonsv(root.configPATH + "/settings.json", { smtp: { username: "Username Mailer Or Email Mailer" } });
		if (!css?.smtp?.password) jsonsv(root.configPATH + "/settings.json", { smtp: { password: "Password Mailer" } });
		if (!css?.smtp?.from) jsonsv(root.configPATH + "/settings.json", { smtp: { from: "Core Panel" } });
		core.sys("Configurações principais do painel - [OK].green ");
	} catch (e) {
		core.sys("[Erro nas principais do painel].red : " + (e as ErrType).message);
	}
}
