import { Sequelize, Options } from "sequelize";
import { json } from "@/utils";
import Configuractions from "@/controllers/settings/Default";
import Loggings from "@/controllers/Loggings";
import { SettingsJson } from "@/interfaces";

const core = new Loggings("Sequelize", "magenta");

/**
 * Json necessario nesse caso, ja que o Storage precisa do User logado
 */
const response: SettingsJson = json(Configuractions.configPATH + "/settings.json");

let sequelizeMG: Options;

if (response?.database) {
	sequelizeMG = {
		...response.database,
		logging: (message: string) => {
			core.debug(message);
		},
	};
} else {
	sequelizeMG = {
		dialect: "sqlite",
		logging: (message: string) => {
			core.debug(message);
		},
	};
}

const sequelize = new Sequelize(sequelizeMG);

export default sequelize;
