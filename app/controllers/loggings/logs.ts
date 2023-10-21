import { json } from "@/utils";
import { getTimestamp } from "@/controllers/loggings/getTimestamp";
import configuraction from "@/controllers/settings/Default";
import { loggings } from "@/controllers/loggings/params";
import colors from "colors";
import { RegisterLog, registerlog } from "@/controllers/loggings/registerlog";
import { Colors, ConsoleLog as ConsoleLogger, LogType } from "@/interfaces/Controllers";
import { CheckColors } from "@/controllers/loggings/CheckColors";
import { LoggingsOptions } from "../Loggings";

const cores: Colors = colors;

export function logs(controller: string, message: string, level: string, color: string, options: LoggingsOptions) {
	let ArchiveLog: string | RegisterLog = "";

	const valoressssss = json(configuraction.configPATH + "/loggings.json");
	const CURRENT_LOG_LEVEL = valoressssss.level || "Debug"; // Altere o nível atual conforme necessário
	// carrega o codigo
	const levelConfig: LogType = loggings[level];
	const currentLevelConfig = loggings[CURRENT_LOG_LEVEL];

	const ColorController = CheckColors(color, controller);
	const SelectedColor = !levelConfig.color ? "white" : CheckColors(levelConfig?.color, level);
	if (level === "OnlyLog") {
		const { fulltimer, timestamp } = getTimestamp();
		const formattedMessage = RemoveColorsParams(message); // remove o parametro de cores 
		if (options.register?.type === "log") {
			ArchiveLog = `[ ${options.register?.timer === "timestamp" ? timestamp : fulltimer} ] [ ${controller} ] ${formattedMessage}`;
		} else if (options.register?.type === "json") {
			ArchiveLog = {
				time: options.register?.timer === "timestamp" ? timestamp.toString() : fulltimer,
				controller,
				message:formattedMessage
			};
		}
		return registerlog(controller, ArchiveLog, level);
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
		const formattedMessage = RemoveColorsParams(message); // remove o parametro de cores 
		if (options.register?.type === "log") {
			ArchiveLog = `[ ${options.register?.timer === "timestamp" ? timestamp : fulltimer} ] [ ${controller} ] ${formattedMessage}`;
		} else if (options.register?.type === "json") {
			ArchiveLog = {
				time: options.register?.timer === "timestamp" ? timestamp.toString() : fulltimer,
				controller,
				level,
				message:formattedMessage
			};
		}
		registerlog(controller, ArchiveLog, level);
	}
}

// Função para remover o padrão de cores na log
function RemoveColorsParams(message: string): string {
	const colorTagPattern = /\[([^\]]+)\]\.(\w+)/g;
	return message.replace(colorTagPattern, (_, text) => {
		const message = `"${text}"`;
		return message; // Retornar o texto original se a cor não for encontrada
	});
}


// Função para substituir os padrões de cor na mensagem
function applyColorTags(message: string): string {
	const colorTagPattern = /\[([^\]]+)\]\.(\w+)/g;
	return message.replace(colorTagPattern, (_, text, color) => {
		const colorFunction = cores[CheckColors(color, `[${text}]`)];
		if (colorFunction) {
			return colorFunction(text);
		} else {
			return text; // Retornar o texto original se a cor não for encontrada
		}
	});
}


// Atualize a função MakeLog para aplicar cores na mensagem
function MakeLog(ConsoleLog: ConsoleLogger) {
	const { currentHour, color, controller, levelColor, level, message } = ConsoleLog;
	const formattedController = cores[color](controller);
	const formattedLevel = cores[levelColor](level);
	const formattedMessage = applyColorTags(message); // Aplicar cores à mensagem

	console.log(`| ${currentHour} | ${formattedController} - ${formattedLevel} | ${formattedMessage}`);
}