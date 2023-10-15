import { logs } from "@/controllers/loggings/logs";

/**
 * Controlador de Logs, params
 * 
 * @param title
 * @param color
 * 
 * uso > const core = new Loggings("Titulo", "green")
 * 
 * Cores permitidas
 * @Array ["strip", "stripColors", "black", "red", "green", "yellow", "blue", "magenta", "cyan", "white", "gray", "grey",
		"bgBlack", "bgRed", "bgGreen", "bgYellow", "bgBlue", "bgMagenta", "bgCyan", "bgWhite",
		"reset", "bold", "dim", "italic", "underline", "inverse", "hidden", "strikethrough",
		"rainbow", "zebra", "america", "trap", "random", "zalgo"]
 */
class Loggings {
	private title: string;
	private color: string;

	constructor(title: string, color: string) {
		this.title = title || "Core";
		this.color = color || "blue";
	}

	log(message: string): void {
		logs(this.title, message, "Info", this.color);
	}

	error(message: string): void {
		logs(this.title, message, "Error", this.color);
	}

	warn(message: string): void {
		logs(this.title, message, "Warn", this.color);
	}

	info(message: string): void {
		logs(this.title, message, "Info", this.color);
	}

	debug(message: string): void {
		logs(this.title, message, "Debug", this.color);
	}

	sys(message: string): void {
		logs(this.title, message, "Core", this.color);
	}

}

/**
 * #### Type LoggingsConstructor
 * 
 * ```ts
 * import Loggings { LoggingsConstructor } from "@/controllers/Loggings"
 * 
 * const core:LoggingsConstructor = new Loggings("Exemplo", "blue")
 * ```
 */
export type LoggingsConstructor = new (title: string, color: string) => Loggings;

/**
 * #### Type LoggingsMethods
 * 
 * ```ts
 * import {LoggingsMethods} from "@/controllers/Loggings"
 * function Core(core: LoggingsMethods) {
 * core.log("Olá")		
 * }
 * ```
 */
export type LoggingsMethods = {
	log: (message: string) => void;
	error: (message: string) => void;
	warn: (message: string) => void;
	info: (message: string) => void;
	debug: (message: string) => void;
	sys: (message: string) => void;
};


export default Loggings;