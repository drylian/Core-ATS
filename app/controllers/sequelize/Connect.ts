import { Sequelize } from "sequelize";
import { json } from "@/utils";
import Configuractions from "@/controllers/settings/Default";
import Loggings from "@/controllers/Loggings";

const core = new Loggings("Sequelize", "magenta");

const respose = json(Configuractions.configPATH + "/settings.json");

if (!respose?.database) {
	core.sys("[Configuração do dialect].bold não detectada, usando [Sqlite].blue como [padrão].green");
}

const sequelizeMG = {
	/**
	 * Configuração do sequelize
	 */
	...respose?.database ? respose.database : {dialect: "sqlite"},
	logging: (message: string) => {
		core.debug(message);
	},
};
const sequelize = new Sequelize(sequelizeMG);

export default sequelize;