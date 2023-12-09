import sequelize from "@/controllers/sequelize/Connect";
import User from "@/models/User";
import Token from "@/models/Token";
import Activity from "@/models/Activity";

/**
 * Models importados
 */
async function init() {
	await sequelize.authenticate();
	await User.sync();
	await Token.sync();
	await Activity.sync();
}

interface Database {
    connection: typeof sequelize;
    init: typeof init;
}

const db: Database = {
	connection: sequelize,
	init,
};

export { db };
