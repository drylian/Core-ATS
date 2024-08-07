import fs, { statSync } from "fs";
import path, { join } from "path";
import { json } from "@/utils";
import configuractions from "@/controllers/settings/Default";
import { Console } from "@/controllers/loggings/OnlyConsole";
import { LoggingsJson } from "@/interfaces";
type LogMessage = string | number | boolean | object;
const core = (levelsss: string, ...message: LogMessage[]) => Console("Loggings", "green", levelsss, message);

export function unlinkfolders(logFolderPath: string, level: string, logtype: string) {
	const loggings: LoggingsJson = json(configuractions.configPATH + "/loggings.json");
	const logFilesPattern = new RegExp(
		`${logtype === "json" ? `.*_${level.toLowerCase()}.json` : `.*_${level.toLowerCase()}.log`}`,
	);
	const logFiles = fs
		.readdirSync(logFolderPath)
		.filter((file) => logFilesPattern.test(file))
		.sort((a, b) => {
			const aStat = statSync(join(logFolderPath, a));
			const bStat = statSync(join(logFolderPath, b));
			return aStat.mtime.getTime() - bStat.mtime.getTime();
		});

	const maxLogFileCount = loggings.autodelete || 10; // sistema de deletar logs, padrão 10
	const ActiveDelete = loggings.activedelete || "on"; // ativa o sistema de deletar logs,

	if (ActiveDelete === "on") {
		if (logFiles.length > maxLogFileCount) {
			const filesToDelete = logFiles.slice(0, logFiles.length - maxLogFileCount); // Get the oldest files to delete
			filesToDelete.forEach((file) => {
				const filePath = path.join(logFolderPath, file);
				core("Info", `log antiga deletada : ["${filePath}"].red`);

				fs.unlinkSync(filePath);
			});
		}
	}
}
