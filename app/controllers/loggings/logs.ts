import { json } from "@/utils";
import { getTimestamp } from "@/controllers/loggings/getTimestamp";
import configuraction from "@/controllers/settings/Default";
import { loggings } from "@/controllers/loggings/params";
import colors from "colors";
import { RegisterLog, registerlog } from "@/controllers/loggings/registerlog";
import { Colors, ConsoleLog as ConsoleLogger, LogType } from "@/interfaces/Controllers";
import { CheckColors } from "@/controllers/loggings/CheckColors";
import { LoggingsOptions } from "../Loggings";
import { LoggingsJson } from "@/interfaces";
import { WhiteColors, WhiteLogs } from "@/controllers/loggings/Colors";

const cores: Colors = colors;
type LogMessage = string | number | boolean | object;

// eslint-disable-line no-console, max-len
export function logs(controller: string, level: string, color: string, options: LoggingsOptions, args: LogMessage[]) {

	const message = WhiteColors(args);
	// const message = msg + args.join(); // converte os args em uma string separando por " "
	let ArchiveLog: string | RegisterLog = "";

	const valoressssss: LoggingsJson = json(configuraction.configPATH + "/loggings.json");
	const CURRENT_LOG_LEVEL = valoressssss.level || "Debug"; // Altere o nível atual conforme necessário
	// carrega o codigo
	const levelConfig: LogType = loggings[level];
	const currentLevelConfig = loggings[CURRENT_LOG_LEVEL];

	const ColorController = CheckColors(color, controller);
	const SelectedColor = !levelConfig.color ? "white" : CheckColors(levelConfig?.color, level);
	if (level === "OnlyLog") {
		const { fulltimer, timestamp } = getTimestamp();
		const formattedMessage = WhiteLogs(args); // remove o parametro de cores 
		if (options.register?.type === "log") {
			ArchiveLog = `[ ${options.register?.timer === "timestamp" ? timestamp : fulltimer} ] [ ${controller} ] ${formattedMessage}`;
		} else if (options.register?.type === "json") {
			ArchiveLog = {
				time: options.register?.timer === "timestamp" ? timestamp.toString() : fulltimer,
				controller,
				message: formattedMessage
			};
		} else {
			ArchiveLog = `[ ${options.register?.timer === "timestamp" ? timestamp : fulltimer} ] [ ${controller} ] ${formattedMessage}`;
		}
		return registerlog(controller, ArchiveLog, "Register");
	}

	if (level === "OnlyConsole") {
		const { currentHour } = getTimestamp();
		const ConsoleLog: ConsoleLogger = {
			currentHour,
			color: ColorController,
			controller,
			levelColor: SelectedColor,
			level: "Console",
			message
		};
		return MakeLog(ConsoleLog);
	}

	if (levelConfig.level <= currentLevelConfig.level) {
		const { currentHour, fulltimer, timestamp } = getTimestamp();
		const ConsoleLog: ConsoleLogger = {
			currentHour,
			color: ColorController,
			controller,
			levelColor: SelectedColor,
			level,
			message
		};
		MakeLog(ConsoleLog);
		const formattedMessage = message; // remove o parametro de cores 
		if (options.register?.type === "log") {
			ArchiveLog = `[ ${options.register?.timer === "timestamp" ? timestamp : fulltimer} ] [ ${controller} ] ${formattedMessage}`;
		} else if (options.register?.type === "json") {
			ArchiveLog = {
				time: options.register?.timer === "timestamp" ? timestamp.toString() : fulltimer,
				controller,
				level,
				message: formattedMessage
			};
		} else {
			ArchiveLog = `[ ${options.register?.timer === "timestamp" ? timestamp : fulltimer} ] [ ${controller} ] ${formattedMessage}`;
		}
		registerlog(controller, ArchiveLog, level);
	}
}


// Atualize a função MakeLog para aplicar cores na mensagem
function MakeLog(ConsoleLog: ConsoleLogger) {
	const { currentHour, color, controller, levelColor, level, message } = ConsoleLog;
	const formattedController = cores[color](controller);
	const formattedLevel = cores[levelColor](level);
	const formattedMessage = message; // Aplicar cores à mensagem

	console.log(`| ${currentHour} | ${formattedController} - ${formattedLevel} | ${formattedMessage}`);
}