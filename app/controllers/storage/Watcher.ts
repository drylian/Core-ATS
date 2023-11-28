import chokidar from "chokidar";
import path from "path";
import storage from "@/controllers/Storage";
import configuractions from "@/controllers/settings/Default";
import { Console } from "../loggings/OnlyConsole";
import { json } from "@/utils";

/**
 * Lista de configurações ignoradas
 */
const ignoresConfs = ["i18altStorage"];

export default function StartSettings() {
	const directoryToWatch = configuractions.configPATH; // Diretório que você deseja observar

	const watcher = chokidar.watch(directoryToWatch, {
		persistent: true,
		// eslint-disable-next-line no-useless-escape
		ignored: /(^|[\/\\])\../, // Ignora arquivos ocultos (começando com ponto)
	});

	watcher.on("add", (filePath) => {
		if (path.extname(filePath) === ".json" && !ignoresConfs.includes(path.basename(filePath, ".json"))) {
			const data: object = json(filePath);
			storage.set(path.basename(filePath, ".json"), { ...data }, true);
			Console(
				"Configurações",
				"blue",
				`${path.relative(directoryToWatch, filePath).replace(".json", "").replace(/[/\\]/g, " -> ")}`,
				["foi adicionado"],
			);
		}
	});

	watcher.on("change", (filePath) => {
		if (path.extname(filePath) === ".json" && !ignoresConfs.includes(path.basename(filePath, ".json"))) {
			const data: object = json(filePath);
			if (path.basename(filePath, ".json") === "settings") storage.set("config", { ...data }, true);
			storage.set(path.basename(filePath, ".json"), { ...data }, true);
			// Console("Configurações", "blue", `${path.relative(directoryToWatch, filePath).replace('.json', '').replace(/[/\\]/g, ' -> ')}`, [`foi alterado, salvando`])
		}
	});

	watcher.on("unlink", (filePath) => {
		if (path.extname(filePath) === ".json" && !ignoresConfs.includes(path.basename(filePath, ".json"))) {
			const data: object = json(filePath);
			storage.set(path.basename(filePath, ".json"), { ...data }, true);
			Console(
				"Configurações",
				"blue",
				`${path.relative(directoryToWatch, filePath).replace(".json", "").replace(/[/\\]/g, " -> ")}`,
				["foi deletado"],
			);
		}
	});

	return watcher;
}
