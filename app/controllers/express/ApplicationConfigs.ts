import { root, type, version } from "@/controllers/settings/Default";
import { ColorJson, SettingsJson } from "@/interfaces";
import storage from "@/controllers/Storage";
export default function ApplicationConfigs() {
	const config: SettingsJson = storage.get("config");
	const colors: ColorJson = storage.get("color");

	const data = {
		Website: {
			title: config.server.title,
			url: config.server.url,
			port: config.server.port,
			mode: config.mode,
			colors: { ...colors },
		},
	};

	return data;
}
