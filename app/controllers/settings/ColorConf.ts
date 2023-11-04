import { jsonsv, json, dirEX } from "@/utils";
import root from "@/controllers/settings/Default";
import { LoggingsMethods } from "@/controllers/Loggings";
import { ColorJson, ErrType } from "@/interfaces";

export default async function ColorConf(core: LoggingsMethods) {
	core.sys("tentando configurar as [Colores do Frontend].blue do painel [4/4]");

	try {
		if (!dirEX(root.configPATH + "/color.json")) {
			core.sys("Não foi possivel encontrar o arquivo de configuração do Color.json, criando.");
		}

		/**
         * Cores do painel(Frontend) - Black White do painel
         */
		const vars: ColorJson = json(root.configPATH + "/color.json");
		if (!vars?.selected) jsonsv(root.configPATH + "/color.json", { selected: "black" });

		/**
         * Black
         */
		const black = vars?.black; // prefix Black
		if (!black?.color?.primary) jsonsv(root.configPATH + "/color.json", { black: { color: { primary: "#000" } } });
		if (!black?.color?.secondary)
			jsonsv(root.configPATH + "/color.json", { black: { color: { secondary: "#1e1e1e" } } });
		if (!black?.color?.tertiary)
			jsonsv(root.configPATH + "/color.json", { black: { color: { tertiary: "#0c0c0c" } } });
		if (!black?.text?.primary) jsonsv(root.configPATH + "/color.json", { black: { text: { primary: "#ffffff" } } });
		if (!black?.text?.secondary)
			jsonsv(root.configPATH + "/color.json", { black: { text: { secondary: "#d9d9d9" } } });
		if (!black?.text?.tertiary)
			jsonsv(root.configPATH + "/color.json", { black: { text: { tertiary: "#808080" } } });
		if (!black?.background) jsonsv(root.configPATH + "/color.json", { black: { background: "#000" } });

		/**
         * White
         */
		const white = vars?.white; // prefix White
		if (!white?.color?.primary) jsonsv(root.configPATH + "/color.json", { white: { color: { primary: "#fff" } } });
		if (!white?.color?.secondary)
			jsonsv(root.configPATH + "/color.json", { white: { color: { secondary: "#d5d5d5" } } });
		if (!white?.color?.tertiary)
			jsonsv(root.configPATH + "/color.json", { white: { color: { tertiary: "#c1bcbc" } } });
		if (!white?.text?.primary) jsonsv(root.configPATH + "/color.json", { white: { text: { primary: "#000" } } });
		if (!white?.text?.secondary)
			jsonsv(root.configPATH + "/color.json", { white: { text: { secondary: "#414040" } } });
		if (!white?.text?.tertiary)
			jsonsv(root.configPATH + "/color.json", { white: { text: { tertiary: "#808080" } } });
		if (!white?.background) jsonsv(root.configPATH + "/color.json", { white: { background: "#fff" } });

		core.sys("Configurações do painel forão verificadas e aprovadas.");
		core.sys("Color([FrontEnd].blue) do painel - [OK].green ");
	} catch (e) {
		core.sys("[Erro nas principais do painel].red : " + (e as ErrType).message);
	}
}
