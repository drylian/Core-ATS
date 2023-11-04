import * as path from "path";
import { Console } from "@/controllers/loggings/OnlyConsole";
import { json } from "@/utils";
export let root: string = "./dist",
	type: string = "",
	IsJavascript: boolean = false,
	version: string = "Canary";
type LogMessage = string | number | boolean | object;
const core = (...message: LogMessage[]) => Console("Principal", "blue", "Infomações", message);

const file = path.join(__filename);

version = json<{ version: "string" }>("./package.json").version;

if (file.endsWith(".js")) {
	IsJavascript = true;
	type = "Javascript";
	root = "./dist"; // Para casos de JavaScript buildado
} else if (file.endsWith(".ts")) {
	type = "Typescript";
	root = "./app"; // Lógica para TypeScript (Desenvolvimento)
}

core(`Servidor está sendo executado em ["${type}"].green com a raiz ["${root}"].blue`);
const configuractions = {
	rootPATH: root,
	configPATH: IsJavascript ? "./config" : root + "/config",
	loggingsPATH: IsJavascript ? "./storage/logs" : root + "/storage/logs",
	routesPATH: root + "/http",
	langsPATH: root + "/langs",
};
export default configuractions;
