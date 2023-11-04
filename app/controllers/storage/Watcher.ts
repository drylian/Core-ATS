import chokidar from "chokidar";
import patche from "path";
import storage from "@/controllers/Storage";
import configuractions from "@/controllers/settings/Default";

export default function StartSettings() {
	const watcher = chokidar.watch(
		[
			configuractions.configPATH + "/settings.json",
			configuractions.configPATH + "/loggings.json",
			configuractions.configPATH + "/color.json",
		],
		{
			persistent: true,
		},
	);

	watcher.on("change", (path) => {
		storage.rel(patche.basename(path, ".json"));
		console.log(`O arquivo ${patche.basename(path, ".json")} foi alterado.`);
	});
	return watcher;
}
