import { json } from "@/utils";
import configuractions from "@/controllers/settings/Default";
import { ColorJson, LoggingsJson, SettingsJson } from "@/interfaces";
import User from "@/models/User";

class Storage {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private storage: { [key: string]: any } = {};

	public async rel<T>(chave: string): Promise<boolean | T> {
		const keys = chave.split(".");
		if (keys.length === 1) {
			if (keys[0] === "settings" || keys[0] === "config")
				this.storage["config"] = json<SettingsJson>(configuractions.configPATH + "/settings.json");
			else if (keys[0] === "loggings")
				this.storage["loggings"] = json<LoggingsJson>(configuractions.configPATH + "/loggings.json");
			else if (keys[0] === "color")
				this.storage["color"] = json<ColorJson>(configuractions.configPATH + "/color.json");
			else return false;
			return true;
		} else {
			if (keys[0] === "users")
				this.storage["users"][keys[1] as string] = await User.findOne({ where: { uuid: keys[1] } });
			else return false;
			return this.storage[chave];
		}
	}

	public set(chave: string, valor: object | string): void {
		this.storage[chave] = valor;
	}

	public get<T>(chave: string): T {
		if (!this.storage[chave]) this.rel<T>(chave);
		return this.storage[chave] || {};
	}

	public del(chave: string): void {
		if (chave in this.storage) {
			delete this.storage[chave];
		}
	}
}
const storage = new Storage();
export default storage;
