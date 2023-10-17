import { jsonsv, json, dirEX } from "@/utils";
import root from "@/controllers/settings/Default";
import { LoggingsMethods } from "../Loggings";
import { ColorJson, ErrType } from "@/interfaces";

export default async function ColorConf(core: LoggingsMethods) {
	core.sys("tentando configurar as [Colores do Frontend].blue do painel [4/4]");

	try {
		if (!dirEX(root.configPATH + "/color.json")) {
			core.sys("Não foi possivel encontrar o arquivo de configuração do Color.json, criando.");
		}

		/**
		 * Cores do painel(Frontend)
		 */
		const color: ColorJson = json(root.configPATH + "/color.json"); // Rele o json e atualiza os valores atuais
		if (!color?.primaria) jsonsv(root.configPATH + "/color.json", { primaria: "#3490dc" });
		if (!color?.secundaria) jsonsv(root.configPATH + "/color.json", { secundaria: "#f39c12" });
		if (!color?.background?.type) jsonsv(root.configPATH + "/color.json", { background: { type: "color" } });
		if (!color?.background?.value) jsonsv(root.configPATH + "/color.json", { background: { value: "#ffffff" } });

		core.sys("Configurações do painel forão verificadas e aprovadas.");
		core.sys("Color([FrontEnd].blue) do painel - [OK].green ");
	} catch (e) {
		core.sys("[Erro nas principais do painel].red : " + (e as ErrType).message)
	}
}