import Settings from "@/controllers/Settings";
import { Console } from "@/controllers/loggings/OnlyConsole";
import User from "@/models/User";
import bcrypt from "bcrypt";
import { genv5 } from "@/utils";
import { ErrType } from "./interfaces/Utils";
import { db } from "@/controllers/Sequelize";
import { webpanel } from "@/controllers/Express";
type LogMessage = string | number | boolean | object;

const core = (...args: LogMessage[]) => Console("Principal", "blue", "Infomações", args);

core("Iniciando processos do painel.");

async function init() {
	try {
		// Carrega as configurações do banco de dados
		await db.init();

		const newUser = await User.create({
			username: "admin",
			email: "admin@gmail.com",
			password: bcrypt.hashSync("admin", bcrypt.genSaltSync(10)),
			uuid: genv5("admin@gmail.com", "users"),
			permissions: 10000,
		});

		const ss = await User.create({
			username: "admins",
			email: "admins@gmail.com",
			password: bcrypt.hashSync("admin", bcrypt.genSaltSync(10)),
			uuid: genv5("admins@gmail.com", "users"),
			permissions: 10000,
			suspended: true,
			suspendedReason: "Nome impróprio.",
		});

		console.log(newUser, ss);
		core("Todos os Sistemas foram iniciados com [sucesso].green.");
	} catch (e) {
		core("Erro ao tentar configurar o painel: " + (e as ErrType).stack);
	}
}

async function run() {
	await Settings().then(async () => {
		await init();
		await webpanel(); // Carrega o webpanel após as configurações e init
	});
}

run();
