import Settings from "@/controllers/Settings";
import { Console } from "@/controllers/loggings/OnlyConsole";
import User from "@/models/User";
import bcrypt from "bcrypt";
import { delay, genv5 } from "@/utils";
import { ErrType } from "@/interfaces/Utils";
import { db } from "@/controllers/Sequelize";
import Express from "@/controllers/Express";
import StartSettings from "@/controllers/storage/Watcher";
import Starti18altJson from "@/controllers/language/Watcher";
import { SystemActivity } from "@/controllers/database/MakeActivity";
import terminal from "@/terminal/Kernel";
import CronController from "./controllers/Cron";
import dis from "./controllers/Discord";

type LogMessage = string | number | boolean | object;

const core = (...args: LogMessage[]) => Console("Principal", "blue", "Infomações", args);

core("Iniciando processos do painel.");

async function init() {
	try {
		StartSettings();
		Starti18altJson();
		// Carrega as configurações do banco de dados
		await db.init();
		await dis.automatic();
		new CronController();

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

		await SystemActivity(`Usuários de testes criados "${newUser.username}" e "${ss.username}" pelo modo dev`);

		//console.log(newUser, ss);
		core("Todos os Sistemas foram iniciados com [sucesso].green.");
	} catch (e) {
		core("Erro ao tentar configurar o painel: " + (e as ErrType).stack);
	}
}

async function run() {
	await Settings().then(async () => {
		await init();
		const server = new Express();
		await server.listen();
		await delay(2000)
		terminal.start()
		return server
	});
}

export default run();
