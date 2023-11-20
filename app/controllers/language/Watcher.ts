import chokidar from "chokidar";
import path from "path";
import storage from "@/controllers/Storage";
import configuractions from "@/controllers/settings/Default";
import { Console } from "../loggings/OnlyConsole";
import { json } from "@/utils";
import * as _ from "lodash";

export default function Starti18altJson() {
	const directoryToWatch = configuractions.langsPATH;

	const watcher = chokidar.watch(directoryToWatch, {
		persistent: true,
		// eslint-disable-next-line no-useless-escape
		ignored: /(^|[\/\\])\../, // Ignora arquivos ocultos (começando com ponto)
	});

	watcher.on("add", (filePath) => {
		if (path.extname(filePath) === ".json") {
			const locale = path.relative(directoryToWatch, filePath).replace(".json", "").replace(/[/\\]/g, ".");
			const data = _.set({}, locale.split("."), json(filePath));
			storage.set("i18altStorage", { ...data }, true);
			Console(
				"i18ALT",
				"green",
				`${path.relative(directoryToWatch, filePath).replace(".json", "").replace(/[/\\]/g, " -> ")}`,
				["foi adicionado"],
			);
		}
	});

	watcher.on("change", (filePath) => {
		if (path.extname(filePath) === ".json") {
			const locale = path.relative(directoryToWatch, filePath).replace(".json", "").replace(/[/\\]/g, ".");
			const data = _.set({}, locale.split("."), json(filePath));
			storage.set("i18altStorage", { ...data }, true);
			Console(
				"i18ALT",
				"green",
				`${path.relative(directoryToWatch, filePath).replace(".json", "").replace(/[/\\]/g, " -> ")}`,
				["foi alterado, salvando"],
			);
		}
	});

	watcher.on("unlink", (filePath) => {
		if (path.extname(filePath) === ".json") {
			const locale = path.relative(directoryToWatch, filePath).replace(".json", "").replace(/[/\\]/g, ".");
			const data = _.set({}, locale.split("."), json(filePath));
			storage.set("i18altStorage", { ...data }, true);
			Console(
				"i18ALT",
				"green",
				`${path.relative(directoryToWatch, filePath).replace(".json", "").replace(/[/\\]/g, " -> ")}`,
				["foi deletado"],
			);
		}
	});

	return watcher;
}
