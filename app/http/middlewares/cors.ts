import { Application, NextFunction, Request, Response } from "express";
import cors, { CorsOptions } from "cors";
import { ErrType, SettingsJson } from "@/interfaces";
import configuractions from "@/controllers/settings/Default";
import { json } from "@/utils";
import Forbidden from "../pages/errors/403.html";
import { SetAlowedRoutes } from "@/controllers/express/AllowedRoutes";

function configureCors(req: Request, res: Response, next: NextFunction) {
	const valores: SettingsJson = json(configuractions.configPATH + "/settings.json") || [];
	if (valores.server.cors.active) {
		cors<Request>({
			origin(requestOrigin, callback) {

				// Configuração de origins e a origin padrão do sistema (a configurada no settings.json)
				if (valores?.server?.cors) {
					if (!valores.server.cors.allowedroutes) {
						valores.server.cors.allowedroutes = "";
					}
					valores.server.cors.allowedroutes += `,${valores.server.url}:${valores.server.port}`;
				}

				const origin = requestOrigin ? requestOrigin : req.headers.host ? SetAlowedRoutes(req.headers.host, valores.server.protocol) : undefined
				const allowedOrigins = SetAlowedRoutes(valores.server.cors.allowedroutes, valores.server.protocol)

				if (origin && typeof origin === "string" && allowedOrigins.indexOf(origin) !== -1) {
					callback(null, true);
				} else if (Array.isArray(origin)) {
					let found = false; // Variável para rastrear se uma origem válida foi encontrada
					origin.forEach((originItem) => {
						if (typeof originItem === 'string' && allowedOrigins.indexOf(originItem) !== -1) {
							callback(null, true);
							found = true; // Uma origem válida foi encontrada
							return;
						}
					});

					if (!found) {
						callback(new Error("Acesso não autorizado devido à política CORS."), false);
					}
				} else {
					callback(new Error("Acesso não autorizado devido à política CORS."), false);
				}
			},
			optionsSuccessStatus: 200,
			credentials: true
		})(req, res, (err) => {
			if (err) {
				// Se ocorrer um erro, a origem não é permitida
				return res.status(403).send(Forbidden((err as ErrType).message));
			} else {
				next();
			}
		});
	} else {
		next();
	}
}

export default configureCors;
