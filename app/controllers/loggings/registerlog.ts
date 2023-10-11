import fs from "fs";
import path from "path";
import { unlinkfolders } from "controllers/loggings/unlinkfolders";
import { dirCR } from "utils/Folder";
import configuraction from "controllers/settings/Default";
import { getTimestamp } from "controllers/loggings/getTimestamp";
import { resolve } from "path";
const LOG_STORAGE_PATH = configuraction.loggingsPATH; // Path das logs

export function registerlog(level: string, message:string, Sublevel:string) {
	const logFileName = `${getTimestamp().dayTimer}_${level.toLowerCase()}.log`;
	const logFolderPath = resolve(LOG_STORAGE_PATH, level, Sublevel || "");
	const logFilePath = path.join(logFolderPath, logFileName);

	dirCR(logFolderPath);
	fs.appendFileSync(logFilePath, message + "\n");

	// Verifica e deleta o arquivo mais antigo
	unlinkfolders(logFolderPath, level);
}