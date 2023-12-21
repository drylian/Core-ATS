import { AlTexp, json, jsonsv } from "@/utils";
import configuractions from "@/controllers/settings/Default";
import User from "@/models/User";
import _ from "lodash";
import { Console, LogMessage } from "./loggings/OnlyConsole";

export class Storage {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private storage: { [key: string]: any } = {};
	private expires: { [key: string]: number } = {};
	private core: (...message: LogMessage[]) => void;
	constructor() {
		this.core = (...message: LogMessage[]) => Console("i18Alt", "red", "Avisos", message);
	}
	public async rel<T>(chave: string): Promise<boolean | T> {
		const keys = chave.split(".");
		if (keys.length === 1) {
			if (keys[0] === "settings" || keys[0] === "config")
				this.storage["config"] = json<T>(configuractions.configPATH + "/settings.json");
			else if (keys[0] === "Accesslist")
				this.storage["Accesslist"] = json<T>(configuractions.configPATH + "/Accesslist.json");
			else if (keys[0] === "loggings")
				this.storage["loggings"] = json<T>(configuractions.configPATH + "/loggings.json");
			else if (keys[0] === "color") this.storage["color"] = json<T>(configuractions.configPATH + "/color.json");
			else return false;
			return true;
		} else {
			if (keys[0] === "users")
				this.storage["users"][keys[1] as string] = await User.findOne({ where: { uuid: keys[1] } });
			else return false;
			return this.storage[chave];
		}
	}

	public set(chave: string, valor: object | string, json?: boolean): void {
		if (valor !== "string") {
			if (chave === "config") this.storage["settings"] = _.merge(this.storage["settings"], valor);
			else this.storage[chave] = _.merge(this.storage[chave], valor);
			if (chave === "config" && json) this.save("settings", valor);
			else if (json) this.save(chave, valor);
		} else this.storage[chave] = valor;
	}

	public get<T>(chave: string): T {
		if (this.expires[chave] && this.storage[chave]) {
			const now = new Date().getTime();
			const expirationTime = new Date(this.expires[chave]).getTime();
			if (now >= expirationTime) {
				this.del(chave);
				return {} as T;
			}
		} else if (this.expires[chave] && !this.storage[chave]) {
			delete this.expires[chave];
		}
		if (!this.storage[chave]) this.rel<T>(chave);
		return this.storage[chave] || {};
	}
	public chk(chave: string): boolean {
		return this.storage[chave] ? true : false;
	}

	public del(chave: string, expecificate?: string): void {
		if (expecificate && expecificate in this.storage[chave]) {
			delete this.storage[chave][expecificate]
		}
		else if (chave in this.storage) {
			delete this.storage[chave];
		}
	}
	/**
	 * ### Cria uma chave temporaria de expiração.
	 * @param {string} chave Objeto que vai ter o temporizador.
	 * @param {string} time O tempo de expiração em "d","h","m".
	 */
	public exp(chave: string, time: string): void {
		if (this.expires[chave]) {
			this.core("Chave ja configurada, pulando...");
			return;
		}
		this.expires[chave] = AlTexp(time);
	}
	public save<T>(chave: string, data: T): void {
		jsonsv(configuractions.configPATH + `/${chave}.json`, data);
	}
}
const storage = new Storage();
export default storage;
