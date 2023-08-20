import { json } from "utils/Json";
import { getTimestamp } from "controllers/loggings/getTimestamp";
import configuraction from "controllers/settings/Default";
import { loggings } from "controllers/loggings/params";
import colors from "colors";
import { registerlog } from "controllers/loggings/registerlog";
import { ConsoleLog as ConsoleLogger, Cores } from "interfaces/Controllers"
import { CheckColors } from "controllers/loggings/CheckColors";
export function logs(controller: string, message: string, level: string, color: string) {
	const valoressssss = json(configuraction.configPATH + "/loggings.json");
	const CURRENT_LOG_LEVEL = valoressssss.level || "Debug"; // Altere o nível atual conforme necessário
	// Use LogType para tipar levelConfig
	const levelConfig: any = loggings[level];
	const currentLevelConfig = loggings[CURRENT_LOG_LEVEL];

	const ColorController = CheckColors(color, controller)
	const SelectedColor = !levelConfig.color ? "white" : CheckColors(levelConfig?.color, level)
	if (level === "Core") {
		const { currentHour } = getTimestamp();
		const ConsoleLog: ConsoleLogger = {
			currentHour,
			color: ColorController,
			controller,
			levelColor: SelectedColor,
			level,
			message
		};
		return MakeLog(ConsoleLog)
	}

	if (levelConfig.level <= currentLevelConfig.level) {
		const { currentHour, fulltimer } = getTimestamp();
		const ConsoleLog: ConsoleLogger = {
			currentHour,
			color: ColorController,
			controller,
			levelColor: SelectedColor,
			level,
			message
		};
		MakeLog(ConsoleLog)
		const ArchiveLog = `[ ${fulltimer} ] [ ${controller} - ${level} ] ${message}`;
		registerlog(controller, ArchiveLog, level);
	}
}

function MakeLog(ConsoleLog: ConsoleLogger) {
	const { currentHour, color, controller, levelColor, level, message } = ConsoleLog;
	const cores:any = colors
	console.log(`| ${currentHour} | ${cores[color](controller)} - ${cores[levelColor](level)} | ${message}`);
}