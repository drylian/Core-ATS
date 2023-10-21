import { dirCR, dirEX } from "@/utils";
import root from "@/controllers/settings/Default";
import Loggings from "@/controllers/Loggings";
import LoggingsConf from "./settings/LoggingsConf";
import SettingsConf from "./settings/SettingsConf";
import DatabaseConf from "./settings/DatabaseConf";
import ColorConf from "./settings/ColorConf";

const core = new Loggings("Settings", "magenta");

const Settings = async () => {
	core.sys("Iniciando verificações das pastas do painel.");

	if (!dirEX(root.loggingsPATH)) {
		core.sys("Pasta de loggings não existe, criando uma.");
		dirCR(root.loggingsPATH);
	}

	if (!dirEX(root.configPATH)) {
		core.sys("Pasta de configurações não existe, criando uma.");
		dirCR(root.configPATH);
	}

	/**
		 * Etapas de configuração
		 */
	await LoggingsConf(core);
	await SettingsConf(core);
	await DatabaseConf(core);
	await ColorConf(core);

	core.sys("Configurações do painel forão verificadas e aprovadas.");

};

export default Settings;