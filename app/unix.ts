import Settings from "@/controllers/Settings";
import { Console } from "@/controllers/loggings/OnlyConsole";
import User from "@/models/User";
import bcrypt from 'bcrypt';
import { genv5 } from "@/utils";
import { ErrType } from "./interfaces/Utils";
import { db } from "@/controllers/Sequelize";
const core = (message: string) => Console("Principal", message, "blue", "Infomações");

core("Iniciando processos do painel.");

async function __init() {

	new Promise(async resolve => {
		const { webpanel } = require("./controllers/Express");
		/**
		 * Carrega as configurações do banco de dados
		 */
		await db.init();
		const newUser = await User.create({
			username: 'admin',
			email: 'admin@gmail.com',
			password: bcrypt.hashSync("admin", bcrypt.genSaltSync(10)),
			uuid: genv5("admin@gmail.com", "users"),
			permissions: 10000
		});

		const ss = await User.create({
			username: 'admins',
			email: 'admins@gmail.com',
			password: bcrypt.hashSync("admin", bcrypt.genSaltSync(10)),
			uuid: genv5("admins@gmail.com", "users"),
			permissions: 10000,
			suspended: true,
			suspendedReason: "Nome improprio."
		});

		console.log(newUser, ss)
		await webpanel();
		// // core.log('Teste')
		// // core.debug('teste')
		// // core.err('teste')
		// // core.warn('teste')
		resolve(core("Todos os Sistemas foram iniciados com [sucesso].green."));
	})
}

try {
	Settings().then(()=>{
		__init()
	});
} catch (e) {
	core("Erro ao tentar configurar o painel: " + (e as ErrType).stack);
}