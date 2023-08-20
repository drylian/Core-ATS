import sequelize from "controllers/sequelize/Connect";
import LoadModels from "controllers/sequelize/LoadModels";
import Loggings from "controllers/Loggings";

const core = new Loggings("Sequelize", "purple");

const db = {
	connection: sequelize,
	...(await LoadModels()), // Cria a função e executa passando o sequelize e DataTypes
	init: async function () {
		await sequelize.authenticate();
		core.log("Conexão com o banco de dados estabelecida com sucesso.");
		const initializedModels = await LoadModels();
		for (const modelName in initializedModels) {
			if (Object.prototype.hasOwnProperty.call(initializedModels, modelName)) {
				const model: any = initializedModels[modelName]();
				core.debug(model);
				if (typeof model === "function" && model.sync) {
					model.sync();
					core.log(`Model '${modelName}' sincronizado com o banco de dados.`);
				}
			}
		}

		await sequelize.sync();
	},
};

// Exporta a instância do banco de dados e a promessa de inicialização
export default db;
export { db };
