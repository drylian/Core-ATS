import { jsonsv, json, question } from "@/utils";
import root from "@/controllers/settings/Default";
import { LoggingsMethods } from "@/controllers/Loggings";
import { ErrType, SettingsJson } from "@/interfaces";

export default async function DatabaseConf(core: LoggingsMethods) {
	core.sys("tentando configurar o [Banco de dados].blue do painel [3/5]");

	try {
		const qprefix = async (config: string) => {
			if (config === "host") {
				core.sys("Configuração de host do banco de dados ainda não foi configurado.");
				return await question({
					type: "input",
					message: `Qual é o host do banco de dados? (${config}) :`,
					default: "localhost",
				});
			}
			if (config === "port") {
				core.sys("Configuração de porta do banco de dados ainda não foi configurado.");
				return parseInt(
					await question({
						type: "input",
						message: `Qual é a porta usada pelo banco de dados? (${config}) :`,
						default: "3000",
					}),
				);
			}
			if (config === "database") {
				core.sys("O banco de dados(database) ainda não foi configurado.");
				return await question({
					type: "input",
					message: `Qual é o banco de dados a ser usado? (${config}) :`,
					default: "database",
				});
			}
			if (config === "username") {
				core.sys("Configuração de usuário master do banco de dados ainda não foi configurado.");
				return await question({
					type: "input",
					message: `Qual é o usuário do banco de dados? (${config}) :`,
					default: "root",
				});
			}
			if (config === "password") {
				core.sys("Configuração de senha do usuário master do banco de dados ainda não foi configurado.");
				return await question({
					type: "input",
					message: `Qual é a senha do usuário usado?(${config}) :`,
					default: "pass",
				});
			}
		};

		const database: SettingsJson = json(root.configPATH + "/settings.json");
		if (!database?.database?.dialect)
			jsonsv(root.configPATH + "/settings.json", { database: { dialect: "sqlite" } });

		/**
         * Rele o Json com as novas configurações salvas
         */
		const css: SettingsJson = json(root.configPATH + "/settings.json"); // Rele o json e atualiza os valores atuais

		if (css.mode === "dev" && css.database.dialect === "sqlite") {
			if (!css?.database?.storage)
				core.sys("Database em modo desenvolvedor, após finalizar o processo o database será deletado.");
		} else if (css.database.dialect === "sqlite") {
			if (!css?.database?.storage)
				jsonsv(root.configPATH + "/settings.json", { database: { storage: root.configPATH + "/core.sqlite" } });
		}
		if (css.database?.dialect === "mysql" || css.database?.dialect === "mariadb") {
			core.sys("Database externo detectado, verificando configurações");
			if (!css?.database?.port)
				jsonsv(root.configPATH + "/settings.json", { database: { port: await qprefix("port") } });
			if (!css?.database?.host)
				jsonsv(root.configPATH + "/settings.json", { database: { host: await qprefix("host") } });
			if (!css?.database?.database)
				jsonsv(root.configPATH + "/settings.json", { database: { database: await qprefix("database") } });
			if (!css?.database?.username)
				jsonsv(root.configPATH + "/settings.json", { database: { username: await qprefix("username") } });
			if (!css?.database?.password)
				jsonsv(root.configPATH + "/settings.json", { database: { password: await qprefix("password") } });
		}

		core.sys("Configurações do painel forão verificadas e aprovadas.");
		core.sys("Banco de dados do painel - [OK].green ");
	} catch (e) {
		core.sys("[Erro nas principais do painel].red : " + (e as ErrType).message);
	}
}
