import * as path from "path";
export let root: string = "./dist", type: string = "", IsJavascript:Boolean = false, version:string = "Canary";


const file = path.join(__filename);

if (file.endsWith(".js")) {
	IsJavascript = true
	type = "Javascript";
	root = "./dist"; // Para casos de JavaScript buildado
} else if (file.endsWith(".ts")) {
	type = "Typescript";
	root = "./app"; // Lógica para TypeScript (Desenvolvimento)
}
import { Console } from "@/controllers/loggings/OnlyConsole";

const core = (message: string) => Console("Principal", message, "blue", "Infomações");
core(`Servidor está sendo executado em ["${type}"].green com a raiz ["${root}"].blue`);

export default {
	rootPATH: root,
	configPATH: IsJavascript ? "./config" : root + "/config",
	loggingsPATH: IsJavascript ? "./storage/logs" : root + "/storage/logs",
	modelsPATH: root + "/models",
	routesPATH: root + "/http",
};
