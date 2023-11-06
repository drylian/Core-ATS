import chokidar from "chokidar";
import path from "path";
import storage from "@/controllers/Storage";
import configuractions from "@/controllers/settings/Default";
import { Console } from "../loggings/OnlyConsole";

export default function StartSettings() {
	const directoryToWatch = configuractions.configPATH; // Diretório que você deseja observar

	const watcher = chokidar.watch(directoryToWatch, {
		persistent: true,
		ignored: /(^|[\/\\])\../, // Ignora arquivos ocultos (começando com ponto)
	});

	watcher.on("add", (filePath) => {
		if (path.extname(filePath) === ".json") {
			storage.rel(path.basename(filePath, ".json"));
			Console("Watcher", "blue", `${path.basename(filePath, ".json")}`, [`foi adicionado`])
		}
	});

	watcher.on("change", (filePath) => {
		if (path.extname(filePath) === ".json") {
			storage.rel(path.basename(filePath, ".json"));
			Console("Watcher", "blue", `${path.basename(filePath, ".json")}`, [`foi alterado`])
		}
	});

	watcher.on("unlink", (filePath) => {
		if (path.extname(filePath) === ".json") {
			storage.rel(path.basename(filePath, ".json"));
			Console("Watcher", "blue", `${path.basename(filePath, ".json")}`, [`foi removido`])
		}
	});

	return watcher;
}
