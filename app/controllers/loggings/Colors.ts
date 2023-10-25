import colorss from 'colors';
import color from 'colors/safe';

import { CheckColors } from '@/controllers/loggings/CheckColors';
import { Colors } from '@/interfaces';
const colors: Colors = colorss;
type LogMessage = string | number | boolean | object | Array<string | number | boolean | object>;

// Função para remover o padrão de cores na log
export function ReStringColors(message: string): string {
    const colorTagPattern = /\[([^\]]+)\]\.(\w+)/g;
    return message.replace(colorTagPattern, (_, text) => {
        const message = `"${text}"`;
        return message; // Retornar o texto original se a cor não for encontrada
    });
}

// Função para substituir os padrões de cor na mensagem
export function StringColors(message: string): string {
    const colorTagPattern = /\[([^\]]+)\]\.(\w+)/g;
    return message.replace(colorTagPattern, (_, text, color) => {
        const colorFunction = colors[CheckColors(color, `[${text}]`)];
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
export function BooleanColors(bool: boolean): string {
    const callback = bool ? color.blue('true') : color.red('false');
    return callback;
}
/**
 * Converte um numero em um numero com cor
 */
export function NumberColors(num: number): string {
    const callback = num ? color.blue(num.toString()) : color.red(num.toString());
    return callback;
}
/**
 * Converte um object em um object com cor
 */
export function ObjectColors(obj: object): string {
    return color.green(JSON.stringify(obj));
}

/**
 * Função para adicionar parâmetros coloridos ao logMessage
 */
export function WhiteColors(args: LogMessage[]): string {
    let logMessage: string = '';
    args.forEach((arg) => {
        if (typeof arg === 'string') {
            logMessage += ` ${StringColors(arg)}`;
        } else if (typeof arg === 'number') {
            logMessage += ` ${NumberColors(arg)}`;
        } else if (typeof arg === 'boolean') {
            logMessage += ` ${BooleanColors(arg)}`;
        } else if (typeof arg === 'object') {
            logMessage += ` ${ObjectColors(arg)}`;
        }
    });

    return logMessage;
}
/**
 * Função para adicionar parâmetros ao logMessage (sem cores)
 */
export function WhiteLogs(args: LogMessage[]): string {
    let logMessage: string = '';
    args.forEach((arg) => {
        if (typeof arg === 'string') {
            logMessage += ` ${ReStringColors(arg)}`;
        } else if (typeof arg === 'number') {
            logMessage += ` ${arg.toString()}`;
        } else if (typeof arg === 'boolean') {
            logMessage += ` ${arg.toString()}`;
        } else if (typeof arg === 'object') {
            logMessage += ` ${JSON.stringify(arg)}`;
        }
    });

    return logMessage;
}
