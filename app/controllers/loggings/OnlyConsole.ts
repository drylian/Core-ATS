import { getTimestamp } from "./getTimestamp";
import { Colors } from "@/interfaces/Controllers";
import colors from "colors/safe";

import { CheckColors } from "./CheckColors";

type LogMessage = string | number | boolean | object;

const cores: Colors = colors;

interface ConsoleLogs {
	currentHour: string;
	color: string;
	controller: string;
	levelColor: string;
	message: string;
	Type: string;
}
export function Console(controller: string, color: string, Type: string, args: LogMessage[]) {
	const message = WhiteColors(args);

	// Atualize a função MakeLog para aplicar cores na mensagem
	function MakeLog(ConsoleLog: ConsoleLogs) {
		const { currentHour, color, controller, levelColor, message, Type } = ConsoleLog;
		const formattedController = cores[color](controller);
		const formattedLevel = cores[levelColor](Type);

		console.log(`| ${currentHour} | ${formattedController} - ${formattedLevel} | ${message}`);
	}

	// Função para substituir os padrões de cor na mensagem
	function StringColors(message: string): string {
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
	/**
	 * Converte boolean em boolean com cor
	 */
	function BooleanColors(bool: boolean): string {
		const callback = bool ? colors.blue("true") : colors.red("false");
		return callback;
	}
	/**
	 * Converte um numero em um numero com cor
	 */
	function NumberColors(num: number): string {
		const callback = colors.blue(num.toString());
		return callback;
	}
	/**
	 * Converte um object em um object com cor
	 */
	function ObjectColors(obj: object): string {
		return colors.green(JSON.stringify(obj));
	}

	/**
	 * Função para adicionar parâmetros coloridos ao logMessage
	 */
	function WhiteColors(args: LogMessage[]): string {
		let logMessage: string = "";
		args.forEach(arg => {
			if (typeof arg === "string") {
				logMessage += ` ${StringColors(arg)}`;
			} else if (typeof arg === "number") {
				logMessage += ` ${NumberColors(arg)}`;
			} else if (typeof arg === "boolean") {
				logMessage += ` ${BooleanColors(arg)}`;
			} else if (typeof arg === "object") {
				logMessage += ` ${ObjectColors(arg)}`;
			}
		});

		return logMessage;
	}
	const { currentHour } = getTimestamp();
	const ConsoleLog: ConsoleLogs = {
		currentHour,
		color,
		controller,
		levelColor: color,
		message,
		Type
	};
	MakeLog(ConsoleLog);

}
