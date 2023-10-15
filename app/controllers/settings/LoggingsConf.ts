import { LoggingsJson } from "@/interfaces";
import { jsonsv, json, dirEX } from "@/utils";
import root from "@/controllers/settings/Default";
import { LoggingsMethods } from "../Loggings";

export default async function LoggingsConf(core: LoggingsMethods) {
	core.sys("Iniciando verificações das [loggings].blue do painel [1/4]");

	if (!dirEX(root.configPATH + "/loggings.json")) {
		core.sys("Não foi possivel encontrar o arquivo de configuração de loggings, criando.");
	}

	const loggings: LoggingsJson = json(root.configPATH + "/loggings.json");
	if (!loggings?.level) jsonsv(root.configPATH + "/loggings.json", { level: "Info" });
	if (!loggings?.autodelete) jsonsv(root.configPATH + "/loggings.json", { autodelete: 10 });
	if (!loggings?.activedelete) jsonsv(root.configPATH + "/loggings.json", { activedelete: "on" });

	core.sys("Loggings do painel - [OK].green ");
}