import sequelize from "controllers/sequelize/Connect";
import Loggings from "controllers/Loggings";
const core = new Loggings("Sequelize", "magenta");
import User from "models/User";
/**
 * Models importados
 */
async function init() {
	await sequelize.authenticate();
	await User.sync()
}

interface Database {
	connection:typeof sequelize
	init:typeof init
}

const db:Database = {
	connection: sequelize,
	init
}

export { db };
