import { Sequelize } from "sequelize";
import { json } from "utils/Json";
import Configuractions from "controllers/settings/Default"
import Loggings from "controllers/Loggings";


const respose = json(Configuractions.configPATH + "/settings.json");

const core = new Loggings("Sequelize", "purple")

/**
 * Configuração do sequelize
 */

const sequelizeMG = {
	...respose.database,
	logging: (message :string) => {
		core.debug(message);
	},
};

const sequelize = new Sequelize(sequelizeMG);


export default sequelize;