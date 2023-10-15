import { dirCR, dirEX } from "@/utils";
import root from "@/controllers/settings/Default";
import Loggings from "@/controllers/Loggings";
import { ErrType } from "@/interfaces";
import LoggingsConf from "./settings/LoggingsConf";
import SettingsConf from "./settings/SettingsConf";
import DatabaseConf from "./settings/DatabaseConf";
import ColorConf from "./settings/ColorConf";

const core = new Loggings("Settings", "magenta");

const Settings = async () => {
	try {
		core.sys("Iniciando verificações das pastas do painel.");
		
		if (!dirEX(root.loggingsPATH)) {
			core.sys("Pasta de loggings não existe, criando uma.");
			dirCR(root.loggingsPATH);
		}

		if (!dirEX(root.configPATH)) {
			core.sys("Pasta de configurações não existe, criando uma.");
			dirCR(root.configPATH);
		}

		if (!dirEX(root.modelsPATH)) {
			core.sys("Pasta de models não existe, criando uma.");
			dirCR(root.modelsPATH);
		}
		/**
		 * Etapas de configuração
		 */
		try {
			await LoggingsConf(core);
		  } catch (error) {
			core.sys("Erro ao configurar as Loggings: " + error );
		  }
		  
		  try {
			await SettingsConf(core);
		  } catch (error) {
			core.sys("Erro ao configurar as configurações principais do painel: " + error);
		  }
		  
		  try {
			await DatabaseConf(core);
		  } catch (error) {
			core.sys("Erro ao configurar o banco de dados: " + error);
		  }
		  
		  try {
			await ColorConf(core);
		  } catch (error) {
			core.sys("Erro ao configurar as cores do Frontend :" + error);
		  }
		  

		core.sys("Configurações do painel forão verificadas e aprovadas.");

	} catch (err) {
		core.error("Erro ao tentar fazer as verificações do painel: " + (err as ErrType).stack);
		return err;
	}

}

export default Settings;