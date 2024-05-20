import { ColorJson, SettingsJson } from "@/interfaces";
import storage from "@/controllers/Storage";
import I18alt from "../Language";
export default function ApplicationConfigs(args?:object) {
	const config: SettingsJson = storage.get("settings");
	const colors: ColorJson = storage.get("color");
	const i18n = new I18alt();
	const languages: { [key: string]: string } = {};
	const langs = i18n.langs;
	langs.map((lang) => {
		const language = i18n.t("language.language", { lang: lang });
		languages[lang] = language;
	});
	const data = {
		Website: {
			title: config.server.title,
			url: config.server.url,
			port: config.server.port,
			mode: config.mode,
			colors: { ...colors },
			auth:{
				discord:config.discord.auth.active,
				register:config.server.register
			},
			langs,
			languages,
			...args
		},
	};

	return data;
}
