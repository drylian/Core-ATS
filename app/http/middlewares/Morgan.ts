import { LoggingsMethods } from "@/controllers/Loggings";
import { NextFunction, Request, Response } from "express";
import morgan from "morgan";
/**
 * Middleware para o Morgan , uso para logs de acesso parecido com o apache
 * @param apache LoggingsMethods
 */
export function MorganLogs(apache: LoggingsMethods) {
	return (req: Request, res: Response, next: NextFunction) => {
		morgan("combined", {
			stream: {
				write: (message: string) => {
					apache.txt(message);
				},
			},
		})(req, res, next);
	};
}
