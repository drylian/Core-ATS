import { logs } from "@/controllers/loggings/logs";
export type LoggingsColors =
	"strip" | "stripColors" | "black" | "red" | "green" | "yellow" | "blue" | "magenta" | "cyan" | "white" | "gray" | "grey" |
	"bgBlack" | "bgRed" | "bgGreen" | "bgYellow" | "bgBlue" | "bgMagenta" | "bgCyan" | "bgWhite" |
	"reset" | "bold" | "dim" | "italic" | "underline" | "inverse" | "hidden" | "strikethrough" |
	"rainbow" | "zebra" | "america" | "trap" | "random" | "zalgo"


/**
 * Opções para configurar o comportamento da classe Loggings.
 *
 * @interface LoggingsOptions
 * @property {object} register - Opções relacionadas ao registro.
 * @property {"default" | "timestamp"} register.timer - Define o formato do temporizador para os registros.
 * @property {"log" | "json"} register.type - Define o tipo de registro para saída.
 * @property {object} console - Opções relacionadas à saída no console.
 * @property {"default" | "timestamp"} console.timer - Define o formato do temporizador para as saídas no console.
 */
export interface LoggingsOptions {
	register?: {
		timer: "default" | "timestamp";
		type: "log" | "json";
	}
}
/**
 * ### Controlador de Logs, params
 * 
 * @class Loggings
 * @param {string} title - O título para os logs.
 * @param {LoggingsColors} color - A cor usada para o titulo na loggings.
 * 
 * @param {LoggingsOptions} options - Opções adicionais no loggings.
 * 
```ts
const core = new Loggings("Titulo", "green", {options})
```
 ** #### Opções para configurar o comportamento da classe Loggings(opcional).

 * @property {object} register - Opções relacionadas ao registro.
 * @property {"default" | "timestamp"} register.timer - Define o formato do temporizador para os registros.
 * @property {"log" | "json"} register.type - Define o tipo de registro para saída.
 * @property {object} console - Opções relacionadas à saída no console.
 * @property {"default" | "timestamp"} console.timer - Define o formato do temporizador para as saídas no console.
 * 
 *
 */
class Loggings {
	private title: string;
	private color: LoggingsColors;
	private options: LoggingsOptions;

	constructor(title: string = "Core", color: LoggingsColors = "blue", options: LoggingsOptions = {}) {
		this.title = title;
		this.color = color;
		this.options = options;

	}

	/**
	 * Registra uma mensagem de log.
	 * 
	 * @param {string} message - A mensagem de log.
	 */
	log(message: string): void {
		logs(this.title, message, "Info", this.color, this.options);
	}

	/**
	 * Registra uma mensagem de erro.
	 * 
	 * @param {string} message - A mensagem de erro.
	 */
	error(message: string): void {
		logs(this.title, message, "Error", this.color, this.options);
	}

	/**
	 * Registra uma mensagem de aviso.
	 * 
	 * @param {string} message - A mensagem de aviso.
	 */
	warn(message: string): void {
		logs(this.title, message, "Warn", this.color, this.options);
	}

	/**
	 * Registra uma mensagem de informação.
	 * 
	 * @param {string} message - A mensagem de informação.
	 */
	info(message: string): void {
		logs(this.title, message, "Info", this.color, this.options);
	}

	/**
	 * Registra uma mensagem de depuração.
	 * 
	 * @param {string} message - A mensagem de depuração.
	 */
	debug(message: string): void {
		logs(this.title, message, "Debug", this.color, this.options);
	}

	/**
	 * Registra uma mensagem no console sem salvá-la em um arquivo de log.
	 * 
	 * @param {string} message - A mensagem a ser registrada no console.
	 */
	sys(message: string): void {
		logs(this.title, message, "OnlyConsole", this.color, this.options);
	}

	/**
	 * Registra uma mensagem diretamente no arquivo de logs, não aparecendo no console.
	 * 
	 * @param {string} logtext - A mensagem a ser registrada no arquivo de log.
	 */
	txt(logtext: string): void {
		logs(this.title, logtext, "OnlyLog", this.color, this.options);
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
	txt: (logtext: string) => void;
};


export default Loggings;